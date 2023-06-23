import { Link } from 'react-router-dom'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

interface PropsType {
    product: ProductType
}

export default function Product({ product }: PropsType) {
    return (
        <Link to={`/products/${product._id}`}>
            <div className='overflow-hidden rounded-sm border border-gray-200 bg-[#FFFFFF] shadow transition-transform duration-100 hover:translate-y-[-0.0625rem] hover:shadow-md'>
                <div className='relative w-full pt-[100%]'>
                    <img
                        src={product.image}
                        alt='item'
                        className='absolute left-0 top-0 h-full w-full bg-white object-cover'
                    />
                </div>
                <div className='overflow-hidden px-2 py-3  text-sm'>
                    <div className='line-clamp-2 min-h-[2rem] text-xs '>{product.name}</div>
                    <div className='mt-2 flex items-center justify-between text-xs sm:mt-3 sm:justify-start sm:text-sm'>
                        <div className='truncate text-[rgba(0,0,0,.54)] line-through'>
                            <span>₫</span>
                            <span>{formatCurrency(product.price_before_discount)}</span>
                        </div>
                        <div className='ml-2 text-xs text-orange sm:text-base'>
                            <span>₫</span>
                            <span>{formatCurrency(product.price)}</span>
                        </div>
                    </div>
                    <div className='mt-2 flex flex-wrap items-center justify-between sm:mt-3 sm:justify-start'>
                        <div className='flex items-center'>
                            <div className='relative'>
                                <div className='absolute left-0 top-0 h-full w-[100%] overflow-hidden'>
                                    <svg
                                        enableBackground='new 0 0 15 15'
                                        viewBox='0 0 15 15'
                                        x={0}
                                        y={0}
                                        className='h-3 w-3 fill-[#FFCE3D] text-[#FFCE3D]'
                                    >
                                        <polygon
                                            points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeMiterlimit={10}
                                        />
                                    </svg>
                                </div>
                                <svg
                                    enableBackground='new 0 0 15 15'
                                    viewBox='0 0 15 15'
                                    x={0}
                                    y={0}
                                    className='h-3 w-3 fill-gray-400 text-gray-400'
                                >
                                    <polygon
                                        points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeMiterlimit={10}
                                    />
                                </svg>
                            </div>
                            <div className='relative'>
                                <div className='absolute left-0 top-0 h-full w-[100%] overflow-hidden'>
                                    <svg
                                        enableBackground='new 0 0 15 15'
                                        viewBox='0 0 15 15'
                                        x={0}
                                        y={0}
                                        className='h-3 w-3 fill-[#FFCE3D] text-[#FFCE3D]'
                                    >
                                        <polygon
                                            points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeMiterlimit={10}
                                        />
                                    </svg>
                                </div>
                                <svg
                                    enableBackground='new 0 0 15 15'
                                    viewBox='0 0 15 15'
                                    x={0}
                                    y={0}
                                    className='h-3 w-3 fill-gray-400 text-gray-400'
                                >
                                    <polygon
                                        points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeMiterlimit={10}
                                    />
                                </svg>
                            </div>
                            <div className='relative'>
                                <div className='absolute left-0 top-0 h-full w-[100%] overflow-hidden'>
                                    <svg
                                        enableBackground='new 0 0 15 15'
                                        viewBox='0 0 15 15'
                                        x={0}
                                        y={0}
                                        className='h-3 w-3 fill-[#FFCE3D] text-[#FFCE3D]'
                                    >
                                        <polygon
                                            points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeMiterlimit={10}
                                        />
                                    </svg>
                                </div>
                                <svg
                                    enableBackground='new 0 0 15 15'
                                    viewBox='0 0 15 15'
                                    x={0}
                                    y={0}
                                    className='h-3 w-3 fill-gray-400 text-gray-400'
                                >
                                    <polygon
                                        points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeMiterlimit={10}
                                    />
                                </svg>
                            </div>
                            <div className='relative'>
                                <div className='absolute left-0 top-0 h-full w-[100%] overflow-hidden'>
                                    <svg
                                        enableBackground='new 0 0 15 15'
                                        viewBox='0 0 15 15'
                                        x={0}
                                        y={0}
                                        className='h-3 w-3 fill-[#FFCE3D] text-[#FFCE3D]'
                                    >
                                        <polygon
                                            points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeMiterlimit={10}
                                        />
                                    </svg>
                                </div>
                                <svg
                                    enableBackground='new 0 0 15 15'
                                    viewBox='0 0 15 15'
                                    x={0}
                                    y={0}
                                    className='h-3 w-3 fill-gray-400 text-gray-400'
                                >
                                    <polygon
                                        points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeMiterlimit={10}
                                    />
                                </svg>
                            </div>
                            <div className='relative'>
                                <div className='absolute left-0 top-0 h-full w-[50%] overflow-hidden'>
                                    <svg
                                        enableBackground='new 0 0 15 15'
                                        viewBox='0 0 15 15'
                                        x={0}
                                        y={0}
                                        className='h-3 w-3 fill-[#FFCE3D] text-[#FFCE3D]'
                                    >
                                        <polygon
                                            points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeMiterlimit={10}
                                        />
                                    </svg>
                                </div>
                                <svg
                                    enableBackground='new 0 0 15 15'
                                    viewBox='0 0 15 15'
                                    x={0}
                                    y={0}
                                    className='h-3 w-3 fill-gray-400 text-gray-400'
                                >
                                    <polygon
                                        points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeMiterlimit={10}
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className='ml-0 mt-1 flex items-center text-xs sm:ml-3 sm:mt-0'>
                            <span>Đã bán</span>
                            <span className='ml-1'>{formatNumberToSocialStyle(product.sold)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
