import { Link } from 'react-router-dom'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'
import ProductRating from '../ProductRating'

interface PropsType {
    product: ProductType
}

export default function Product({ product }: PropsType) {
    return (
        <div>
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
                        <ProductRating rating={product.rating} />
                        <div className='ml-0 mt-1 flex items-center text-xs sm:ml-3 sm:mt-0'>
                            <span>Đã bán</span>
                            <span className='ml-1'>{formatNumberToSocialStyle(product.sold)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
