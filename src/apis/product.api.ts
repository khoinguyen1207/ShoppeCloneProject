import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_PRODUCT = 'products'

const productApi = {
    getProduct(params: ProductListConfig) {
        return http.get<SuccessResponse<ProductList>>(URL_PRODUCT, { params })
    },
    getProductDetail(id: string) {
        return http.get<SuccessResponse<Product>>(`${URL_PRODUCT}/${id}`)
    }
}

export default productApi
