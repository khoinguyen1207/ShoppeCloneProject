import { useQuery } from '@tanstack/react-query'
import { isUndefined, omitBy } from 'lodash'
import productApi from 'src/apis/product.api'
import AsideFilter from 'src/components/AsideFilter'
import Pagination from 'src/components/Pagination'
import Product from 'src/components/Product'
import SortProductList from 'src/components/SortProductList'
import useQueryParams from 'src/hooks/useQueryParams'
import { ProductListConfig } from 'src/types/product.type'

export type QueryConfig = {
    [key in keyof ProductListConfig]: string
}

export default function ProductList() {
    const queryParams: QueryConfig = useQueryParams()
    const queryConfig: QueryConfig = omitBy(
        {
            page: queryParams.page || '1',
            limit: queryParams.limit || '10',
            sort_by: queryParams.sort_by,
            order: queryParams.order,
            exclude: queryParams.exclude,
            category: queryParams.category,
            rating_filter: queryParams.rating_filter,
            price_max: queryParams.price_max,
            price_min: queryParams.price_min,
            name: queryParams.name
        },
        isUndefined
    )

    const { data } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => productApi.getProduct(queryConfig as ProductListConfig),
        keepPreviousData: true
    })

    return (
        <div className='bg-[#F5F5F5] py-6'>
            <div className='container'>
                <div className='grid grid-cols-1 md:grid-cols-12'>
                    <div className='md:col-span-3'>
                        <AsideFilter />
                    </div>
                    <div className='md:col-span-9'>
                        <SortProductList />
                        {data && (
                            <>
                                <div className='mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                                    {data.data.data.products.map((product) => {
                                        return (
                                            <div className='col-span-1' key={product._id}>
                                                <Product product={product} />
                                            </div>
                                        )
                                    })}
                                </div>
                                <Pagination queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
