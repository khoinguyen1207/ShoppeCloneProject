import { useMutation, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ROUTES } from 'src/constants/routes'
import { UserSchema, userSchema } from 'src/utils/rules'
import { Controller, useForm } from 'react-hook-form'
import { useContext, useMemo, useState } from 'react'
import InputNumber from 'src/components/InputNumber'
import { yupResolver } from '@hookform/resolvers/yup'
import DateSelect from '../../components/DateSelect'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'
import { toast } from 'react-toastify'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import InputFile from 'src/components/InputFile'
import Loading from 'src/components/Loading'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

type FormData = Pick<UserSchema, 'name' | 'address' | 'avatar' | 'phone' | 'date_of_birth'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
    date_of_birth?: string
}
const profileSchema = userSchema.pick(['name', 'address', 'avatar', 'phone', 'date_of_birth'])

export default function Profile() {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        setError,
        formState: { errors, isDirty },
        watch
    } = useForm<FormData>({
        defaultValues: {
            name: '',
            address: '',
            avatar: '',
            phone: '',
            date_of_birth: new Date(1990, 0, 1)
        },
        resolver: yupResolver(profileSchema)
    })
    const { setProfile, profile } = useContext(AppContext)
    const [file, setFile] = useState<File>()
    const avatar = watch('avatar')
    const { t } = useTranslation('profile')

    const previewImage = useMemo(() => {
        return file ? URL.createObjectURL(file) : ''
    }, [file])

    const { isFetching, refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: userApi.getUser,
        onSuccess: (data) => {
            const profile = data.data.data
            setValue('name', profile.name)
            setValue('address', profile.address)
            setValue('phone', profile.phone)
            setValue('avatar', profile.avatar)
            setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
        }
    })
    const emailString = useMemo(() => {
        if (profile) {
            const { email } = profile
            return email.replace(email.substring(3, email.indexOf('@')), '***********')
        }
    }, [profile])

    const updateMutation = useMutation({ mutationFn: userApi.updateProfile })
    const uploadAvatarMutation = useMutation({ mutationFn: userApi.uploadAvatar })

    const handleUpdate = handleSubmit(async (data) => {
        try {
            let avatarName = avatar
            if (file) {
                const form = new FormData()
                form.append('image', file)
                const uploadRes = await uploadAvatarMutation.mutateAsync(form)
                avatarName = uploadRes.data.data
                setValue('avatar', avatarName)
            }
            const res = await updateMutation.mutateAsync({
                ...data,
                date_of_birth: data.date_of_birth?.toISOString(),
                avatar: avatarName
            })
            setProfile(res.data.data)
            setProfileToLS(res.data.data)
            toast.success(res.data.message)
            refetch()
        } catch (error) {
            if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
                const formError = error.response?.data.data
                if (formError) {
                    Object.keys(formError).forEach((key) =>
                        setError(key as keyof FormDataError, {
                            message: formError[key as keyof FormDataError],
                            type: 'Server'
                        })
                    )
                }
            }
        }
    })

    const handleChangeFile = (file?: File) => {
        setFile(file)
    }

    return (
        <div className='rounded bg-[#FFFFFF] px-4 py-4 shadow sm:px-8 sm:py-8'>
            <Loading visible={isFetching} />
            <Helmet>
                <title>Hồ sơ | Shopee Clone</title>
                <meta name='description' content='Trang hồ sơ dự án Shoppe Clone' />
            </Helmet>
            <div className='border-b border-gray-300 pb-5'>
                <h1 className='text-lg'>{t('profile.My Profile')}</h1>
                <p className='text-sm text-gray-500'>{t('profile.Profile description')}</p>
            </div>
            <form className='mt-5 flex flex-wrap items-start text-sm' onSubmit={handleUpdate}>
                <div className='flex-grow lg:border-r lg:border-gray-300 lg:pr-10'>
                    <div className='items-center md:flex'>
                        <div className='truncate capitalize text-gray-500 md:w-[20%] md:text-right'>Email</div>
                        <div className='mt-1 md:mt-0 md:w-[80%] md:pl-5'>{emailString}</div>
                    </div>
                    <div className='mt-4 items-center md:mt-6 md:flex'>
                        <div className='truncate capitalize text-gray-500 md:w-[20%] md:text-right'>{t('profile.Password')}</div>
                        <div className='mt-1 md:mt-0 md:w-[80%] md:pl-5'>
                            ***************{' '}
                            <Link className='ml-3 text-sm text-blue-500 underline' to={ROUTES.CHANGE_PASSWORD}>
                                {t('profile.Change')}
                            </Link>
                        </div>
                    </div>
                    <div className='mt-3 items-center md:mt-6 md:flex'>
                        <div className='truncate capitalize text-gray-500 md:w-[20%] md:pb-5 md:text-right'>{t('profile.Name')}</div>
                        <div className='md:w-[80%] md:pl-5'>
                            <Input
                                placeholder={t('profile.Name')}
                                register={register}
                                name='name'
                                errorMessage={errors.name?.message}
                                classNameError='mt-1 min-h-[1rem] text-red-600 text-xs'
                                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500'
                            />
                        </div>
                    </div>
                    <div className='mt-3 items-center md:mt-3 md:flex'>
                        <div className='truncate capitalize  text-gray-500 md:w-[20%] md:pb-5 md:text-right'>{t('profile.Phone Number')}</div>
                        <div className='md:w-[80%] md:pl-5'>
                            <Controller
                                control={control}
                                name='phone'
                                render={({ field }) => {
                                    return (
                                        <InputNumber
                                            value={field.value}
                                            placeholder={t('profile.Phone Number')}
                                            classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500'
                                            onChange={field.onChange}
                                            errorMessage={errors.phone?.message}
                                            classNameError='mt-1 min-h-[1rem] text-xs text-red-600'
                                        />
                                    )
                                }}
                            />
                        </div>
                    </div>
                    <div className='mt-3 items-center md:mt-3 md:flex'>
                        <div className='truncate capitalize text-gray-500 md:w-[20%] md:pb-5 md:text-right'>{t('profile.Address')}</div>
                        <div className='md:w-[80%] md:pl-5'>
                            <Input
                                register={register}
                                name='address'
                                errorMessage={errors.address?.message}
                                classNameError='mt-1 min-h-[1rem] text-red-600 text-xs'
                                placeholder={t('profile.Address')}
                                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500'
                            />
                        </div>
                    </div>
                    <Controller
                        control={control}
                        name='date_of_birth'
                        render={({ field }) => (
                            <DateSelect value={field.value} errorMessage={errors.date_of_birth?.message} onChange={field.onChange} />
                        )}
                    />
                    <div className='mt-3 items-center md:flex'>
                        <div className='truncate capitalize text-gray-500 md:w-[20%] md:pb-5 md:text-right' />
                        <div className='md:w-[80%] md:pl-5'>
                            <Button
                                type='submit'
                                isLoading={updateMutation.isLoading}
                                disabled={!isDirty}
                                className='rounded-sm bg-orange px-5 py-2 text-white hover:bg-orange/80'
                            >
                                {t('changePassword.Save')}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='mt-6 flex w-full justify-center lg:mt-0 lg:w-64 '>
                    <div className='flex flex-col items-center'>
                        <div className='my-4 h-24 w-24 overflow-hidden rounded-full'>
                            <img className='h-full w-full object-cover' src={previewImage || getAvatarUrl(avatar)} alt='' />
                        </div>
                        <InputFile onChange={handleChangeFile} />
                        <div className='mt-3 text-gray-400'>{t('profile.File size')}</div>
                        <div className='text-gray-400'>{t('profile.File extension')}</div>
                    </div>
                </div>
            </form>
        </div>
    )
}
