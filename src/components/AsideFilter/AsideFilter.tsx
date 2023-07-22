import { Link, createSearchParams } from 'react-router-dom'
import { path } from 'src/constants/path'
import Button from '../Button'
import { QueryConfig } from 'src/pages/ProductList/ProductList'
import { Category } from 'src/types/category.type'
import classNames from 'classnames'

interface Props {
    queryConfig: QueryConfig
    categories: Category[]
}

export default function AsideFilter({ queryConfig, categories }: Props) {
    const { category } = queryConfig

    return (
        <div className='mr-0 py-4 font-bold md:mr-6 '>
            <Link
                to={path.home}
                className={classNames('flex items-center capitalize', {
                    'text-orange': !category,
                    'text-black': category
                })}
            >
                <svg viewBox='0 0 12 10' className='mr-3 h-3 w-3 fill-current font-bold'>
                    <g fillRule='evenodd' stroke='none' strokeWidth={1}>
                        <g transform='translate(-373 -208)'>
                            <g transform='translate(155 191)'>
                                <g transform='translate(218 17)'>
                                    <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                                    <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                                    <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                <span>Tất cả Danh mục</span>
            </Link>
            <div className='mt-3 border-[1px] border-gray-200' />
            <div className='my-3'>
                <ul className='text-sm font-medium '>
                    {categories.map((categoryItem) => {
                        const isActive = categoryItem._id === category
                        return (
                            <li className='py-2' key={categoryItem._id}>
                                <Link
                                    to={{
                                        pathname: path.home,
                                        search: createSearchParams({
                                            ...queryConfig,
                                            category: categoryItem._id
                                        }).toString()
                                    }}
                                    className={classNames('flex items-center capitalize ', {
                                        'font-semibold text-orange': isActive,
                                        'text-black': !isActive
                                    })}
                                >
                                    <svg
                                        viewBox='0 0 4 7'
                                        className={classNames('mr-3 h-2 w-2 fill-orange', {
                                            'fill-orange': isActive,
                                            'fill-[#F5F5F5]': !isActive
                                        })}
                                    >
                                        <polygon points='4 3.5 0 0 0 7' />
                                    </svg>
                                    {categoryItem.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <Link to={path.home} className='flex items-center pt-5 uppercase'>
                <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-3 h-3 w-3 fill-black stroke-current'
                >
                    <g>
                        <polyline
                            fill='none'
                            points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeMiterlimit={10}
                        />
                    </g>
                </svg>
                <span>Bộ lọc tìm kiếm</span>
            </Link>
            <div className='mt-3 border-[1px] border-gray-200' />
            <div className='py-3 text-sm font-normal'>
                <div>Khoản Giá</div>
                <form>
                    <div className='my-4 flex items-center justify-between'>
                        <input
                            type='text'
                            placeholder='₫ TỪ'
                            className='w-full rounded-sm border border-gray-400 px-2 py-1 outline-none focus:shadow-sm'
                        />
                        <div className='mx-5 shrink-0 font-bold'>-</div>
                        <input
                            type='text'
                            placeholder='₫ ĐẾN'
                            className='w-full rounded-sm border border-gray-400 px-2 py-1 outline-none focus:shadow-sm'
                        />
                    </div>
                    <Button className='w-full rounded-sm bg-orange p-[5px] text-sm uppercase text-white'>
                        Áp dụng
                    </Button>
                </form>
            </div>
            <div className='mt-3 border-[1px] border-gray-200' />
            <div className='py-3 text-sm font-normal'>
                <div>Đánh giá</div>
                <ul className='mt-2 pl-2'>
                    <li>
                        <Link to='' className='flex items-center'>
                            {Array(5)
                                .fill(0)
                                .map((_, index) => (
                                    <svg viewBox='0 0 9.5 8' className='mx-1 h-4 w-4' key={index}>
                                        <defs>
                                            <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                                                <stop offset={0} stopColor='#ffca11' />
                                                <stop offset={1} stopColor='#ffad27' />
                                            </linearGradient>
                                            <polygon
                                                id='ratingStar'
                                                points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                                            />
                                        </defs>
                                        <g
                                            fill='url(#ratingStarGradient)'
                                            fillRule='evenodd'
                                            stroke='none'
                                            strokeWidth={1}
                                        >
                                            <g transform='translate(-876 -1270)'>
                                                <g transform='translate(155 992)'>
                                                    <g transform='translate(600 29)'>
                                                        <g transform='translate(10 239)'>
                                                            <g transform='translate(101 10)'>
                                                                <use
                                                                    stroke='#ffa727'
                                                                    strokeWidth='.5'
                                                                    xlinkHref='#ratingStar'
                                                                />
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                ))}
                            <span className='ml-3'>trở lên</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='' className='flex items-center'>
                            {Array(5)
                                .fill(0)
                                .map((_, index) => (
                                    <svg viewBox='0 0 9.5 8' className='mx-1 h-4 w-4' key={index}>
                                        <defs>
                                            <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                                                <stop offset={0} stopColor='#ffca11' />
                                                <stop offset={1} stopColor='#ffad27' />
                                            </linearGradient>
                                            <polygon
                                                id='ratingStar'
                                                points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                                            />
                                        </defs>
                                        <g
                                            fill='url(#ratingStarGradient)'
                                            fillRule='evenodd'
                                            stroke='none'
                                            strokeWidth={1}
                                        >
                                            <g transform='translate(-876 -1270)'>
                                                <g transform='translate(155 992)'>
                                                    <g transform='translate(600 29)'>
                                                        <g transform='translate(10 239)'>
                                                            <g transform='translate(101 10)'>
                                                                <use
                                                                    stroke='#ffa727'
                                                                    strokeWidth='.5'
                                                                    xlinkHref='#ratingStar'
                                                                />
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                ))}
                            <span className='ml-3'>trở lên</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='mt-3 border-[1px] border-gray-200' />
            <Button className='mt-5 w-full rounded-sm bg-orange p-[5px] text-sm font-normal uppercase text-white'>
                Xóa tất cả
            </Button>
        </div>
    )
}
