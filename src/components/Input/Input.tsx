import type { UseFormRegister } from 'react-hook-form'

interface Props {
    type: React.HTMLInputTypeAttribute
    register: UseFormRegister<any>
    name: string
    className?: string
    placeholder?: string
    errorMessage?: string
}

export default function Input({ type, name, register, className, errorMessage, placeholder }: Props) {
    return (
        <div className={className}>
            <input
                type={type}
                className='w-full rounded-sm border border-gray-300 p-2 outline-none focus:border-gray-500 sm:p-3'
                placeholder={placeholder}
                autoComplete='on'
                {...register(name)}
            />
            <div className='mt-1 min-h-[1rem] text-xs text-red-600 sm:min-h-[1.5rem] sm:text-sm'>{errorMessage}</div>
        </div>
    )
}
