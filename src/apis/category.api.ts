import { Category } from 'src/types/category.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_CATEGORIES = 'categories'

const categoryApi = {
    getCategories() {
        return http.get<SuccessResponse<Category[]>>(URL_CATEGORIES)
    }
}

export default categoryApi
