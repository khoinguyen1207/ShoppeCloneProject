import { path } from 'src/constants/path'
import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const productApi = {
    getProduct(params: ProductListConfig) {
        return http.get<SuccessResponse<ProductList>>(path.products, { params })
    },
    getProductDetail(id: string) {
        return http.get<SuccessResponse<Product>>(`/products/${id}`)
    }
}

export default productApi
