import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name?: string
    classNameInput?: string
}

export default function InputNumber({ placeholder, onChange, classNameInput, ...rest }: Props) {
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
