import { Schema, schema } from 'src/utils/rules'
import useQueryConfig from './useQueryConfig'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createSearchParams, useNavigate } from 'react-router-dom'
import omit from 'lodash/omit'
import { ROUTES } from 'src/constants/routes'

type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])

export default function useSearchProduct() {
    const queryConfig = useQueryConfig()
    const { register, handleSubmit } = useForm<FormData>({
        defaultValues: { name: '' },
        resolver: yupResolver(nameSchema)
    })
    const navigate = useNavigate()

    const onSubmitSearch = handleSubmit((data) => {
        const config = queryConfig.order
            ? omit(
                  {
                      ...queryConfig,
                      name: data.name
                  },
                  ['order', 'sort_by', 'page']
              )
            : omit(
                  {
                      ...queryConfig,
                      name: data.name
                  },
                  ['page']
              )

        navigate({
            pathname: ROUTES.HOME,
            search: createSearchParams(config).toString()
        })
    })
    return { onSubmitSearch, register }
}
