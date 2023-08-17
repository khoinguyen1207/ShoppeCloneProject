import { Purchases, PurchasesListStatus } from 'src/types/purchases.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const purchasesApi = {
    addToCart(body: { product_id: string; buy_count: number }) {
        return http.post<SuccessResponse<Purchases>>('/purchases/add-to-cart', body)
    },
    getPurchases(params: { status: PurchasesListStatus }) {
        return http.get<SuccessResponse<Purchases[]>>('/purchases', { params })
    }
}

export default purchasesApi
