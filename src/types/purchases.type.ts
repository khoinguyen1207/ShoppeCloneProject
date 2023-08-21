import { Product } from './product.type'

export type PurchasesStatus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchasesListStatus = PurchasesStatus | 0

export interface Purchases {
    buy_count: number
    price: number
    price_before_discount: number
    status: PurchasesListStatus
    _id: string
    user: string
    product: Product
    createdAt: string
    updatedAt: string
}

export interface ExtendPurchase extends Purchases {
    disable: boolean
    checked: boolean
}
