import { useQuery } from '@tanstack/react-query'
import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import AsideFilter from 'src/components/AsideFilter'
import Pagination from 'src/components/Pagination'
import Product from 'src/components/Product'
import SortProductList from 'src/components/SortProductList'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'

export default function ProductList() {
    const queryConfig = useQueryConfig()
    const { data: productData } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => productApi.getProduct(queryConfig as ProductListConfig),
        keepPreviousData: true,
        staleTime: 3 * 60 * 1000
    })

    const { data: categoryData } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryApi.getCategories()
    })

    return (
        <div className='bg-[#F5F5F5] py-6'>
            <div className='container'>
                <div className='grid grid-cols-1 md:grid-cols-12'>
                    <div className='md:col-span-3'>
                        <AsideFilter categories={categoryData?.data.data || []} queryConfig={queryConfig} />
                    </div>
                    {productData && (
                        <div className='md:col-span-9'>
                            <SortProductList
                                queryConfig={queryConfig}
                                pageSize={productData.data.data.pagination.page_size}
                            />
                            {productData.data.data.products.length <= 0 ? (
                                <div className='my-20'>
                                    <img
                                        src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/a60759ad1dabe909c46a817ecbf71878.png'
                                        alt='ImageNotFound'
                                        className='mx-auto w-[8.375rem]'
                                    />
                                    <div className='text-center text-lg'>Không tìm thấy sản phẩm phù hợp</div>
                                </div>
                            ) : (
                                <>
                                    <div className='mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                                        {productData.data.data.products.map((product) => {
                                            return (
                                                <div className='col-span-1' key={product._id}>
                                                    <Product product={product} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <Pagination
                                        queryConfig={queryConfig}
                                        pageSize={productData.data.data.pagination.page_size}
                                    />
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
