import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name?: string
}

export default function InputNumber({ placeholder, onChange, ...rest }: Props) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        if ((value.match(/^[0-9]+$/) || value === '') && onChange) {
            onChange(event)
        }
    }
    return (
        <input
            type='text'
            className='w-full rounded-sm border border-gray-400 px-2 py-1 outline-none focus:shadow-sm'
            placeholder={placeholder}
            onChange={handleChange}
            {...rest}
        />
    )
}
