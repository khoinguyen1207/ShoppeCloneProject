import { Purchases, PurchasesListStatus } from 'src/types/purchases.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_PURCHASE = 'purchases'
const URL_ADDTOCART = 'purchases/add-to-cart'
const URL_BUY_PRODUCT = 'purchases/buy-products'
const URL_UPDATE_PURCHASE = 'purchases/update-purchase'

const purchasesApi = {
    addToCart(body: { product_id: string; buy_count: number }) {
        return http.post<SuccessResponse<Purchases>>(URL_ADDTOCART, body)
    },
    getPurchases(params: { status: PurchasesListStatus }) {
        return http.get<SuccessResponse<Purchases[]>>(URL_PURCHASE, { params })
    },
    buyProduct(body: { product_id: string; buy_count: number }[]) {
        return http.post<SuccessResponse<Purchases[]>>(URL_BUY_PRODUCT, body)
    },
    updatePurchase(body: { product_id: string; buy_count: number }) {
        return http.put<SuccessResponse<Purchases>>(URL_UPDATE_PURCHASE, body)
    },
    deletePurchase(purchaseIds: string[]) {
        return http.delete<SuccessResponse<{ deleted_count: number }>>(URL_PURCHASE, {
            data: purchaseIds
        })
    }
}

export default purchasesApi
