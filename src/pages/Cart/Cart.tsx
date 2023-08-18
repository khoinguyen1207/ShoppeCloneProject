import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import purchasesApi from 'src/apis/purchases.api'
import QuantityController from 'src/components/QuantityController'
import { purchaseStatus } from 'src/constants/purchases'
import { Purchases } from 'src/types/purchases.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils/utils'
import { produce } from 'immer'
import classNames from 'classnames'

interface ExtendPurchase extends Purchases {
    disable: boolean
    checked: boolean
}

export default function Cart() {
    const [extendPurchase, setExtendPurchase] = useState<ExtendPurchase[]>([])

    // Get data cart
    const { data: purchaseInCartData, refetch } = useQuery({
        queryKey: ['purchases', { status: purchaseStatus.inCart }],
        queryFn: () => purchasesApi.getPurchases({ status: purchaseStatus.inCart })
    })
    const purchaseInCart = purchaseInCartData?.data.data
    const isAllChecked = extendPurchase?.every((purchase) => purchase.checked === true)

    // Cập nhật cart
    const updatePurchaseMutation = useMutation({
        mutationFn: purchasesApi.updatePurchase,
        onSuccess: () => {
            refetch()
        }
    })

    useEffect(() => {
        setExtendPurchase((prev) => {
            return (
                purchaseInCart?.map((purchase, index) => {
                    return {
                        ...purchase,
                        disable: false,
                        checked: Boolean(prev[index]?.checked)
                    }
                }) || []
            )
        })
    }, [purchaseInCart])

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

    const handleTotalAmount = () => {
        let amount = 0
        extendPurchase.forEach((purchase) => {
            if (purchase.checked) {
                amount += purchase.product.price * purchase.buy_count
            }
        })
        return amount
    }

    const handleTotalDiscount = () => {
        let amount = 0
        extendPurchase.forEach((purchase) => {
            if (purchase.checked) {
                amount += (purchase.product.price_before_discount - purchase.product.price) * purchase.buy_count
            }
        })
        return amount
    }

    return (
        <div className='bg-[#F5F5F5] py-10 text-base'>
            <div className='container'>
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
                                        className='mb-8 grid grid-cols-12 rounded-sm border border-gray-300 py-6 text-sm last:mb-0'
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
                                            <div className='grid h-full grid-cols-5 items-center text-center'>
                                                <div className='col-span-2 flex justify-center'>
                                                    <span className='mr-2 text-gray-500 line-through'>
                                                        ₫{formatCurrency(purchase.product.price_before_discount)}
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
                                                        ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                                                    </span>
                                                </div>
                                                <div className='col-span-1'>
                                                    <button className='hover:text-orange'>Xóa</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='sticky bottom-0 z-10 mt-8 rounded-sm border border-gray-200 bg-white px-5 py-5 shadow'>
                    <div className='items-center lg:flex lg:justify-between'>
                        <div className='flex items-center'>
                            <input
                                type='checkbox'
                                className='mr-5 h-4 w-4 accent-orange'
                                checked={isAllChecked}
                                onChange={handleAllChecked}
                            />
                            <button className='text-base' onClick={handleAllChecked}>
                                Chọn tất cả ({purchaseInCart?.length})
                            </button>
                            <button className='ml-5 hover:text-orange'>Xóa</button>
                        </div>
                        <div className='lg:flex'>
                            <div className='py-4 lg:mr-5 lg:py-0 lg:text-end'>
                                <div className='flex items-start '>
                                    <div>
                                        Tổng thanh toán ({extendPurchase?.filter((purchase) => purchase.checked).length}{' '}
                                        {}
                                        sản phẩm):
                                    </div>
                                    <span className='ml-2 text-xl text-orange'>
                                        ₫{formatCurrency(handleTotalAmount())}
                                    </span>
                                </div>
                                <div className='text-sm'>
                                    Tiết kiệm
                                    <span className='ml-4 text-orange'>
                                        ₫{formatNumberToSocialStyle(handleTotalDiscount())}
                                    </span>
                                </div>
                            </div>

                            <button
                                disabled={Boolean(handleTotalAmount() === 0)}
                                className={classNames(
                                    'rounded-sm bg-orange px-12 py-2 text-white hover:bg-orange/80 lg:px-16 lg:py-0',
                                    {
                                        'cursor-not-allowed': Boolean(handleTotalAmount() === 0)
                                    }
                                )}
                            >
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
