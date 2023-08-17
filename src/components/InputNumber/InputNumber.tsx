import { InputHTMLAttributes, useState } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
    classNameInput?: string
}

export default function InputNumber({ placeholder, onChange, classNameInput, value = '', ...rest }: InputNumberProps) {
    const [localValue, setLocalValue] = useState<string>(value as string)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        if (value.match(/^[0-9]+$/) || value === '') {
            onChange && onChange(event)
            setLocalValue(value)
        }
    }
    return (
        <div>
            <input
                type='text'
                className={classNameInput}
                placeholder={placeholder}
                value={value || localValue}
                onChange={handleChange}
                {...rest}
            />
        </div>
    )
}
