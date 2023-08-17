import { InputHTMLAttributes } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
    classNameInput?: string
}

export default function InputNumber({ placeholder, onChange, classNameInput, ...rest }: InputNumberProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        if ((value.match(/^[0-9]+$/) || value === '') && onChange) {
            onChange(event)
        }
    }
    return (
        <div>
            <input type='text' className={classNameInput} placeholder={placeholder} onChange={handleChange} {...rest} />
        </div>
    )
}
