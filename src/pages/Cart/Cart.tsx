import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import purchasesApi from 'src/apis/purchases.api'
import QuantityController from 'src/components/QuantityController'
import { purchaseStatus } from 'src/constants/purchases'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils/utils'
import { produce } from 'immer'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import noproduct from 'src/assets/no-product.png'
import { path } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'

export default function Cart() {
    const { extendPurchase, setExtendPurchase } = useContext(AppContext)
    const location = useLocation()
    const purchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId

    // Get data cart
    const { data: purchaseInCartData, refetch } = useQuery({
        queryKey: ['purchases', { status: purchaseStatus.inCart }],
        queryFn: () => purchasesApi.getPurchases({ status: purchaseStatus.inCart })
    })
    const purchaseInCart = purchaseInCartData?.data.data

    const isAllChecked = useMemo(() => {
        return extendPurchase?.every((purchase) => purchase.checked === true)
    }, [extendPurchase])

    const checkedPurchase = useMemo(() => {
        return extendPurchase.filter((purchase) => purchase.checked)
    }, [extendPurchase])

    const totalAmount = useMemo(() => {
        return checkedPurchase.reduce((result, current) => {
            return result + current.product.price * current.buy_count
        }, 0)
    }, [checkedPurchase])

    const totalDiscount = useMemo(() => {
        return checkedPurchase.reduce((result, current) => {
            return result + (current.product.price_before_discount - current.product.price) * current.buy_count
        }, 0)
    }, [checkedPurchase])

    // Cập nhật cart
    const updatePurchaseMutation = useMutation({
        mutationFn: purchasesApi.updatePurchase,
        onSuccess: () => {
            refetch()
        }
    })

    // Xóa sản phẩm
    const deletePurchaseMutation = useMutation({
        mutationFn: purchasesApi.deletePurchase,
        onSuccess: (data) => {
            refetch()
            toast.success(data.data.message, { autoClose: 1000 })
        }
    })

    // Mua sản phẩm
    const buyProductMutation = useMutation({
        mutationFn: purchasesApi.buyProduct,
        onSuccess: (data) => {
            refetch()
            toast.success(data.data.message, { autoClose: 1000, position: 'top-center' })
        }
    })

    useEffect(() => {
        setExtendPurchase((prev) => {
            return (
                purchaseInCart?.map((purchase, index) => {
                    const isCheckedPurchaseFromLocation = purchaseIdFromLocation === purchase._id
                    return {
                        ...purchase,
                        disable: false,
                        checked: isCheckedPurchaseFromLocation || Boolean(prev[index]?.checked)
                    }
                }) || []
            )
        })
        return () => {
            history.replaceState(null, '')
        }
    }, [purchaseIdFromLocation, purchaseInCart, setExtendPurchase])

    const handleChecked = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setExtendPurchase(
            produce((draft) => {
                draft[purchaseIndex].checked = event.target.checked
            })
        )
    }

    const handleAllChecked = () => {
        setExtendPurchase((prev) =>
            prev.map((purchase) => {
                return {
                    ...purchase,
                    checked: !isAllChecked
                }
            })
        )
    }

    const handleQuantity = (purchaseIndex: number, value: number) => {
        if (value !== extendPurchase[purchaseIndex].buy_count) {
            setExtendPurchase(
                produce((draft) => {
                    draft[purchaseIndex].disable = true
                })
            )
            updatePurchaseMutation.mutate({ product_id: extendPurchase[purchaseIndex].product._id, buy_count: value })
        }
    }

    const handleDelete = (purchaseIndex: number) => {
        const purchaseId = extendPurchase[purchaseIndex]._id
        deletePurchaseMutation.mutate([purchaseId])
    }

    const handleDeleteManyPurchase = () => {
        if (checkedPurchase.length > 0) {
            const purchaseIds = checkedPurchase.map((purchase) => purchase._id)
            deletePurchaseMutation.mutate(purchaseIds)
        }
    }

    const handleBuyProduct = () => {
        if (checkedPurchase.length > 0) {
            const body = checkedPurchase.map((purchase) => {
                return {
                    product_id: purchase.product._id,
                    buy_count: purchase.buy_count
                }
            })
            buyProductMutation.mutate(body)
        }
    }

    return (
        <div className='bg-[#F5F5F5] py-10 text-base'>
            <div className='container'>
                {purchaseInCart && purchaseInCart.length > 0 ? (
                    <>
                        <div className='overflow-auto'>
                            <div className='min-w-[1000px]'>
                                <div className='grid grid-cols-12 rounded-sm bg-white px-5 py-5 text-gray-500 shadow'>
                                    <div className='col-span-6'>
                                        <div className='grid grid-cols-8'>
                                            <div className='col-span-1 flex items-center justify-center'>
                                                <input
                                                    type='checkbox'
                                                    className='h-4 w-4 accent-orange'
                                                    checked={isAllChecked}
                                                    onChange={handleAllChecked}
                                                />
                                            </div>
                                            <div className='col-span-7 text-black'>Sản phẩm</div>
                                        </div>
                                    </div>
                                    <div className='col-span-6'>
                                        <div className='grid grid-cols-5 text-center'>
                                            <div className='col-span-2 '>Đơn giá</div>
                                            <div className='col-span-1'>Số lượng</div>
                                            <div className='col-span-1'>Số tiền</div>
                                            <div className='col-span-1'>Thao tác</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-8 rounded-sm bg-white px-5 py-5 shadow'>
                                    {extendPurchase?.map((purchase, index) => {
                                        return (
                                            <div
                                                key={purchase._id}
                                                className='mb-8 grid grid-cols-12 items-center rounded-sm border border-gray-300 py-6 text-sm last:mb-0'
                                            >
                                                <div className='col-span-6'>
                                                    <div className='grid grid-cols-8'>
                                                        <div className='col-span-1 flex items-center justify-center'>
                                                            <input
                                                                type='checkbox'
                                                                className='h-4 w-4 accent-orange'
                                                                checked={purchase.checked}
                                                                onChange={handleChecked(index)}
                                                            />
                                                        </div>
                                                        <div className='col-span-7 text-black'>
                                                            <Link
                                                                to={`/${generateNameId(
                                                                    purchase.product.name,
                                                                    purchase.product._id
                                                                )}`}
                                                                className='flex items-center'
                                                            >
                                                                <img
                                                                    src={purchase.product.image}
                                                                    alt='purchase'
                                                                    className='h-20 w-20'
                                                                />
                                                                <span className='line-clamp-2 px-3'>
                                                                    {purchase.product.name}
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-span-6'>
                                                    <div className='grid grid-cols-5 items-center text-center'>
                                                        <div className='col-span-2 flex justify-center'>
                                                            <span className='mr-2 text-gray-500 line-through'>
                                                                ₫
                                                                {formatCurrency(purchase.product.price_before_discount)}
                                                            </span>
                                                            <span>₫{formatCurrency(purchase.product.price)}</span>
                                                        </div>
                                                        <div className='col-span-1'>
                                                            <QuantityController
                                                                max={purchase.product.quantity}
                                                                value={purchase.buy_count}
                                                                classNameWrapper=''
                                                                loading={purchase.disable}
                                                                onIncrease={(value) => handleQuantity(index, value)}
                                                                onDecrease={(value) => handleQuantity(index, value)}
                                                                onBlur={(event) => {
                                                                    handleQuantity(index, Number(event.target.value))
                                                                }}
                                                            />
                                                        </div>
                                                        <div className='col-span-1'>
                                                            <span className='text-orange'>
                                                                ₫
                                                                {formatCurrency(
                                                                    purchase.product.price * purchase.buy_count
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className='col-span-1'>
                                                            <button
                                                                onClick={() => handleDelete(index)}
                                                                className='hover:text-orange'
                                                            >
                                                                Xóa
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='bottom-0 z-10 mt-8 rounded-sm border border-gray-200 bg-white px-5 py-5 shadow md:sticky'>
                            <div className='items-center justify-between md:flex'>
                                <div className='flex items-center text-sm md:text-base'>
                                    <input
                                        type='checkbox'
                                        className='mr-5 h-4 w-4 accent-orange'
                                        checked={isAllChecked}
                                        onChange={handleAllChecked}
                                    />
                                    <button className='' onClick={handleAllChecked}>
                                        Chọn tất cả ({purchaseInCart?.length})
                                    </button>
                                    <button onClick={handleDeleteManyPurchase} className='ml-5 hover:text-orange'>
                                        Xóa
                                    </button>
                                </div>
                                <div className='md:flex'>
                                    <div className='py-3 text-sm md:mr-3 md:py-0 md:text-end lg:text-base'>
                                        <div className='flex items-center'>
                                            <div>Tổng thanh toán ({checkedPurchase.length} sản phẩm):</div>
                                            <span className='ml-2 text-lg text-orange lg:text-xl'>
                                                ₫{formatCurrency(totalAmount)}
                                            </span>
                                        </div>
                                        <div className='text-sm'>
                                            Tiết kiệm
                                            <span className='ml-4 text-orange'>
                                                ₫{formatNumberToSocialStyle(totalDiscount)}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        disabled={updatePurchaseMutation.isLoading || buyProductMutation.isLoading}
                                        onClick={handleBuyProduct}
                                        className={classNames(
                                            'rounded-sm bg-orange px-6 py-1 text-white hover:bg-orange/80 lg:px-14 lg:py-0',
                                            {
                                                'cursor-not-allowed bg-orange/80': Boolean(totalAmount === 0)
                                            }
                                        )}
                                    >
                                        Mua ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='py-10 text-center'>
                        <div className='m-auto w-fit'>
                            <img src={noproduct} alt='no-purchase' className='h-24 w-24' />
                        </div>
                        <div className='mt-3 capitalize'>Giỏ hàng của bạn còn trống</div>
                        <Link
                            to={path.home}
                            className='mt-3 inline-block rounded-sm bg-orange px-12 py-2 text-white hover:bg-orange/80 lg:px-12 lg:py-2'
                        >
                            Mua ngay
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
