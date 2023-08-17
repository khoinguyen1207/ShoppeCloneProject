import { Purchases, PurchasesListStatus } from 'src/types/purchases.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const purchasesApi = {
    addToCart(body: { product_id: string; buy_count: number }) {
        return http.post<SuccessResponse<Purchases>>('/purchases/add-to-cart', body)
    },
    getPurchases(params: { status: PurchasesListStatus }) {
        return http.get<SuccessResponse<Purchases[]>>('/purchases', { params })
    },
    buyProduct(body: { product_id: string; buy_count: number }[]) {
        return http.post<SuccessResponse<Purchases[]>>('/purchases/buy-products', body)
    },
    updatePurchase(body: { product_id: string; buy_count: number }) {
        return http.put<SuccessResponse<Purchases>>('/purchases/update-purchase', body)
    },
    deletePurchase(purchaseIds: string) {
        return http.delete<SuccessResponse<{ deleted_count: number }>>('/purchases', {
            data: purchaseIds
        })
    }
}

export default purchasesApi
