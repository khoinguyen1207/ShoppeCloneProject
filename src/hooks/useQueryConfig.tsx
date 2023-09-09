import { ProductListConfig } from 'src/types/product.type'
import useQueryParams from './useQueryParams'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

export type QueryConfig = {
    [key in keyof ProductListConfig]: string
}

export default function useQueryConfig() {
    const queryParams: QueryConfig = useQueryParams()
    const queryConfig: QueryConfig = omitBy(
        {
            page: queryParams.page || '1',
            limit: queryParams.limit || '5',
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
    return queryConfig
}
