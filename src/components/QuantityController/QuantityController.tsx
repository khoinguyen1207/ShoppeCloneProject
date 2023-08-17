import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
    max?: number
    onDecrease?: (value: number) => void
    onIncrease?: (value: number) => void
    onType?: (value: number) => void
    classNameWrapper?: string
}

export default function QuantityController({
    max,
    onDecrease,
    onIncrease,
    onType,
    value,
    classNameWrapper = 'mr-4 sm:mr-8',
    ...rest
}: Props) {
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let _value = Number(event.target.value)
        if (max !== undefined && _value > max) {
            _value = max
        } else if (_value < 1) {
            _value = 1
        }
        onType && onType(_value)
    }

    const handleIncrease = () => {
        let _value = Number(value) + 1
        if (max !== undefined && _value > max) {
            _value = max
        }
        onIncrease && onIncrease(_value)
    }

    const handleDecrease = () => {
        let _value = Number(value) - 1
        if (_value < 1) {
            _value = 1
        }
        onDecrease && onDecrease(_value)
    }
    return (
        <div className={'flex items-center' + classNameWrapper}>
            <button
                onClick={handleDecrease}
                className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-4 w-4'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
                </svg>
            </button>
            <InputNumber
                value={value}
                {...rest}
                classNameInput='h-8 w-14 border-b border-t border-gray-300 px-2 text-center outline-none'
                onChange={handleOnChange}
            />
            <button
                onClick={handleIncrease}
                className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-4 w-4'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                </svg>
            </button>
        </div>
    )
}
