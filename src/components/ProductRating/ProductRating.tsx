/* Ví dụ rating 3.4
1 < 3.4 => 100%
2 < 3.4 => 100%
3 < 3.4 => 100%
4 > 3.4 => 40%  (3.4 - 3 = 0.4  * 100)
5 > 3.4 => 0%
*/

interface Props {
    rating: number
    activeClassName?: string
    nonActiveClassName?: string
}

export default function ProductRating({
    rating,
    activeClassName = 'h-3 w-3 fill-[#FFCE3D] text-[#FFCE3D]',
    nonActiveClassName = 'h-3 w-3 fill-gray-400 text-gray-400'
}: Props) {
    const handleWidth = (order: number) => {
        if (order <= rating) {
            return '100%'
        }
        if (order > rating && order - rating < 1) {
            return (rating - Math.floor(rating)) * 100 + '%'
        }
        return '0%'
    }

    return (
        <div className='flex items-center'>
            {Array(5)
                .fill(0)
                .map((_, index) => {
                    return (
                        <div className='relative' key={index}>
                            <div
                                className='absolute left-0 top-0 h-full overflow-hidden'
                                style={{ width: handleWidth(index + 1) }}
                            >
                                <svg
                                    enableBackground='new 0 0 15 15'
                                    viewBox='0 0 15 15'
                                    x={0}
                                    y={0}
                                    className={activeClassName}
                                >
                                    <polygon
                                        points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeMiterlimit={10}
                                    />
                                </svg>
                            </div>
                            <svg
                                enableBackground='new 0 0 15 15'
                                viewBox='0 0 15 15'
                                x={0}
                                y={0}
                                className={nonActiveClassName}
                            >
                                <polygon
                                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeMiterlimit={10}
                                />
                            </svg>
                        </div>
                    )
                })}
        </div>
    )
}
