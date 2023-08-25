import { InputHTMLAttributes } from 'react'
import type { UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    register?: UseFormRegister<any>
    name?: string
    className?: string
    classNameInput?: string
    classNameError?: string
    errorMessage?: string
}

export default function Input({
    name,
    register,
    className,
    classNameInput = 'w-full rounded-sm border border-gray-300 p-2 outline-none focus:border-gray-500 sm:p-3',
    classNameError = 'mt-1 min-h-[1rem] text-xs text-red-600 sm:min-h-[1.5rem] sm:text-sm',
    errorMessage,
    ...rest
}: Props) {
    const registerInput = register && name ? register(name) : {}
    return (
        <div className={className}>
            <input className={classNameInput} autoComplete='on' {...registerInput} {...rest} />
            <div className={classNameError}>{errorMessage}</div>
        </div>
    )
}
