import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
    type: React.HTMLInputTypeAttribute
    register: UseFormRegister<any>
    name: string
    className?: string
    placeholder?: string
    errorMessage?: string
    rules?: RegisterOptions
}

export default function Input({ type, name, register, className, errorMessage, placeholder, rules }: Props) {
    return (
        <div className={className}>
            <input
                type={type}
                className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500'
                placeholder={placeholder}
                autoComplete='on'
                {...register(name, rules)}
            />
            <div className='mt-1 min-h-[1.5rem] text-sm text-red-600'>{errorMessage}</div>
        </div>
    )
}
