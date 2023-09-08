import classNames from 'classnames'
import { omit } from 'lodash'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import { order as orderConstant, sortBy } from 'src/constants/product'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'

interface PropsType {
    queryConfig: QueryConfig
    pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: PropsType) {
    const sort_by = queryConfig.sort_by || sortBy.createdAt
    const page = Number(queryConfig.page)
    const order = queryConfig.order
    const navigate = useNavigate()

    const isActiveSortBy = (isSortBy: Exclude<ProductListConfig['sort_by'], undefined>) => {
        return sort_by === isSortBy
    }

    const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
        navigate({
            pathname: path.home,
            search: createSearchParams(
                omit(
                    {
                        ...queryConfig,
                        sort_by: sortByValue
                    },
                    ['order']
                )
            ).toString()
        })
    }

    const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
        navigate({
            pathname: path.home,
            search: createSearchParams({
                ...queryConfig,
                sort_by: sortBy.price,
                order: orderValue
            }).toString()
        })
    }

    return (
        <div className='flex flex-wrap items-center justify-center gap-3 rounded-sm bg-[#EDEDED] px-4 py-3 lg:justify-between'>
            <div className='text-center text-sm'>
                <span className='mb-2 mr-3 md:mb-0'>Sắp xếp theo</span>
                <button
                    className={classNames('shadow-s mb-2 mr-4 rounded-sm px-3 py-2 capitalize lg:mb-0', {
                        'bg-orange text-white hover:bg-orange/75': isActiveSortBy(sortBy.view),
                        'bg-white text-black hover:bg-white/60': !isActiveSortBy(sortBy.view)
                    })}
                    onClick={() => handleSort(sortBy.view)}
                >
                    Phổ biến
                </button>
                <button
                    className={classNames('shadow-s mb-2 mr-4 rounded-sm px-3 py-2 capitalize lg:mb-0', {
                        'bg-orange text-white hover:bg-orange/75': isActiveSortBy(sortBy.createdAt),
                        'bg-white text-black hover:bg-white/60': !isActiveSortBy(sortBy.createdAt)
                    })}
                    onClick={() => handleSort(sortBy.createdAt)}
                >
                    Mới nhất
                </button>
                <button
                    className={classNames('shadow-s mb-2 mr-4 rounded-sm px-3 py-2 capitalize lg:mb-0', {
                        'bg-orange text-white hover:bg-orange/75': isActiveSortBy(sortBy.sold),
                        'bg-white text-black hover:bg-white/60': !isActiveSortBy(sortBy.sold)
                    })}
                    onClick={() => handleSort(sortBy.sold)}
                >
                    Bán chạy
                </button>
                <select
                    className={classNames('mr-4 rounded-sm px-3 py-2 shadow-sm outline-none', {
                        'bg-orange text-white hover:bg-orange/75': isActiveSortBy(sortBy.price),
                        'bg-white text-black hover:bg-white/60': !isActiveSortBy(sortBy.price)
                    })}
                    onChange={(event) =>
                        handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)
                    }
                    value={order || ''}
                >
                    <option value='' disabled className='bg-white text-black'>
                        Giá
                    </option>
                    <option value={orderConstant.asc} className='bg-white text-black'>
                        Giá: Thấp đến Cao
                    </option>
                    <option value={orderConstant.desc} className='bg-white text-black'>
                        Giá: Cao đến Thấp
                    </option>
                </select>
            </div>
            <div className='flex items-center '>
                <span className='mr-4'>
                    <span className='text-orange'>{page}</span>/{pageSize}
                </span>
                {page === 1 ? (
                    <button
                        aria-label='Previous page'
                        className='flex cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/40 px-3 py-[11px] shadow'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='h-3 w-3'
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                        </svg>
                    </button>
                ) : (
                    <Link
                        to={{
                            pathname: '/',
                            search: createSearchParams({
                                ...queryConfig,
                                page: (page - 1).toString()
                            }).toString()
                        }}
                        aria-label='Previous page'
                        className='flex items-center justify-center rounded-bl-sm rounded-tl-sm bg-white px-3 py-[11px] shadow'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='h-3 w-3'
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                        </svg>
                    </Link>
                )}

                {page === pageSize ? (
                    <button
                        aria-label='Next page'
                        className='flex cursor-not-allowed items-center justify-center rounded-br-sm rounded-tr-sm bg-white/40 px-3 py-[11px] shadow'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='h-3 w-3'
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                        </svg>
                    </button>
                ) : (
                    <Link
                        to={{
                            pathname: '/',
                            search: createSearchParams({
                                ...queryConfig,
                                page: (page + 1).toString()
                            }).toString()
                        }}
                        aria-label='Next page'
                        className='flex items-center justify-center rounded-br-sm rounded-tr-sm bg-white px-3 py-[11px] shadow'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='h-3 w-3'
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                        </svg>
                    </Link>
                )}
            </div>
        </div>
    )
}
