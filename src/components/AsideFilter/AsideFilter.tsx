import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import Button from '../Button'
import { Category } from 'src/types/category.type'
import classNames from 'classnames'
import InputNumber from '../InputNumber'
import { Controller, useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from 'src/types/utils.type'
import RatingStars from '../RatingStars'
import omit from 'lodash/omit'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useTranslation } from 'react-i18next'

interface Props {
    queryConfig: QueryConfig
    categories: Category[]
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>
const priceSchema = schema.pick(['price_max', 'price_min'])

export default function AsideFilter({ queryConfig, categories }: Props) {
    const { category } = queryConfig
    const navigate = useNavigate()
    const { t } = useTranslation(['home', 'error'])

    const {
        control,
        handleSubmit,
        trigger,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        defaultValues: {
            price_min: '',
            price_max: ''
        },
        resolver: yupResolver(priceSchema)
    })

    const onSubmit = handleSubmit((data) => {
        navigate({
            pathname: path.home,
            search: createSearchParams({
                ...queryConfig,
                price_min: data.price_min,
                price_max: data.price_max
            }).toString()
        })
    })

    const handleRemoveFilter = () => {
        navigate({
            pathname: path.home,
            search: createSearchParams(
                omit(queryConfig, ['price_min', 'price_max', 'category', 'rating_filter', 'name'])
            ).toString()
        })
        reset()
    }

    return (
        <div className='mr-0 py-4 font-bold md:mr-6 '>
            <Link
                to={path.home}
                className={classNames('flex items-center capitalize', {
                    'text-orange': !category,
                    'text-black': category
                })}
            >
                <svg viewBox='0 0 12 10' className='mr-3 h-3 w-3 fill-current font-bold'>
                    <g fillRule='evenodd' stroke='none' strokeWidth={1}>
                        <g transform='translate(-373 -208)'>
                            <g transform='translate(155 191)'>
                                <g transform='translate(218 17)'>
                                    <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                                    <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                                    <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
                <span>{t('aside filter.all categories')}</span>
            </Link>
            <div className='mt-3 border-[1px] border-gray-200' />
            <div className='my-3'>
                <ul className='text-sm font-medium '>
                    {categories.map((categoryItem) => {
                        const isActive = categoryItem._id === category
                        return (
                            <li className='py-2' key={categoryItem._id}>
                                <Link
                                    to={{
                                        pathname: path.home,
                                        search: createSearchParams(
                                            omit(
                                                {
                                                    ...queryConfig,
                                                    category: categoryItem._id
                                                },
                                                ['page']
                                            )
                                        ).toString()
                                    }}
                                    className={classNames('flex items-center capitalize ', {
                                        'font-semibold text-orange': isActive,
                                        'text-black': !isActive
                                    })}
                                >
                                    <svg
                                        viewBox='0 0 4 7'
                                        className={classNames('mr-3 h-2 w-2 fill-orange', {
                                            'fill-orange': isActive,
                                            'fill-white': !isActive
                                        })}
                                    >
                                        <polygon points='4 3.5 0 0 0 7' />
                                    </svg>
                                    {categoryItem.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <Link to={path.home} className='flex items-center pt-5 uppercase'>
                <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-3 h-3 w-3 fill-black stroke-current'
                >
                    <g>
                        <polyline
                            fill='none'
                            points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeMiterlimit={10}
                        />
                    </g>
                </svg>
                <span>{t('aside filter.filter')}</span>
            </Link>
            <div className='mt-3 border-[1px] border-gray-200' />
            <div className='py-3 text-sm font-normal'>
                <div>{t('aside filter.price range')}</div>
                <form onSubmit={onSubmit}>
                    <div className='mt-4 flex items-center justify-between'>
                        <Controller
                            name='price_min'
                            control={control}
                            render={({ field }) => {
                                return (
                                    <InputNumber
                                        value={field.value}
                                        placeholder={'₫ ' + t('aside filter.min')}
                                        classNameInput='w-full rounded-sm border border-gray-400 px-2 py-1 outline-none focus:shadow-sm'
                                        onChange={(event) => {
                                            field.onChange(event)
                                            trigger('price_max')
                                        }}
                                    />
                                )
                            }}
                        />
                        <div className='mx-5 shrink-0 font-bold'>-</div>
                        <Controller
                            name='price_max'
                            control={control}
                            render={({ field }) => {
                                return (
                                    <InputNumber
                                        value={field.value}
                                        placeholder={'₫ ' + t('aside filter.max')}
                                        classNameInput='w-full rounded-sm border border-gray-400 px-2 py-1 outline-none focus:shadow-sm'
                                        onChange={(event) => {
                                            field.onChange(event)
                                            trigger('price_min')
                                        }}
                                    />
                                )
                            }}
                        />
                    </div>
                    <div className='py-2  text-center text-orange'>
                        {errors.price_min?.message && t(`error:errorMessage.invalid price`)}
                    </div>
                    <Button className='w-full rounded-sm bg-orange p-[5px] text-sm uppercase text-white'>
                        {t('aside filter.apply')}
                    </Button>
                </form>
            </div>
            <div className='mt-3 border-[1px] border-gray-200' />
            <div className='py-3 text-sm font-normal'>
                <div>{t('aside filter.rating')}</div>
                <RatingStars queryConfig={queryConfig} />
            </div>
            <div className='mt-3 border-[1px] border-gray-200' />
            <Button
                onClick={handleRemoveFilter}
                className='mt-5 w-full rounded-sm bg-orange p-[5px] text-sm font-normal uppercase text-white'
            >
                {t('aside filter.clear all')}
            </Button>
        </div>
    )
}
