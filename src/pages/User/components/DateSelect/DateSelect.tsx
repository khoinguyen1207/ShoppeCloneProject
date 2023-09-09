import range from 'lodash/range'
import { useEffect, useState } from 'react'

interface Props {
    onChange?: (value: Date) => void
    value?: Date
    errorMessage?: string
}

export default function DateSelect({ onChange, errorMessage, value }: Props) {
    const [date, setDate] = useState({
        day: 1,
        month: 0,
        year: 1990
    })

    useEffect(() => {
        if (value) {
            setDate({
                day: Number(value.getDate()),
                month: Number(value.getMonth()),
                year: Number(value.getFullYear())
            })
        }
    }, [value])

    const handleOnchange = (event: React.ChangeEvent<HTMLSelectElement>, name: string) => {
        const newDate = {
            ...date,
            [name]: Number(event.target.value)
        }
        setDate(newDate)
        onChange && onChange(new Date(newDate.year, newDate.month, newDate.day))
    }

    return (
        <div className='mt-3 items-center md:mt-3 md:flex'>
            <div className='truncate capitalize  text-gray-500 md:w-[20%] md:pb-5 md:text-right'>Ngày sinh</div>
            <div className='md:w-[80%] md:pl-5'>
                <div className='flex items-center justify-between'>
                    <select
                        onChange={(e) => handleOnchange(e, 'day')}
                        value={date.day}
                        className='h-8 w-[30%] rounded-sm border border-gray-500 px-3'
                    >
                        {range(1, 32).map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={(e) => handleOnchange(e, 'month')}
                        value={date.month}
                        className='h-8 w-[30%] rounded-sm border border-gray-500 px-3'
                    >
                        {range(0, 12).map((item) => (
                            <option key={item} value={item}>
                                Tháng {item + 1}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={(e) => handleOnchange(e, 'year')}
                        value={date.year}
                        className='h-8 w-[30%] rounded-sm border border-gray-500 px-3'
                    >
                        {range(1910, new Date().getFullYear() + 1)
                            .reverse()
                            .map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                    </select>
                </div>
                <div className='mt-1 min-h-[1rem] text-xs text-red-600'>{errorMessage}</div>
            </div>
        </div>
    )
}
