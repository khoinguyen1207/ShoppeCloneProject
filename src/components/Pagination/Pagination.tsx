import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import { path } from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

/*
Case 1: 
[1] 2 3 ... 19 20
1 [2] 3 4 ... 19 20 
1 2 [3] 4 5 ... 19 20
1 2 3 [4] 5 6 ... 19 20
1 2 3 4 [5] 6 7 ... 19 20


Case 2:
1 2 ... 4 5 [6] 8 9 ... 19 20
1 2 ...13 14 [15] 16 17 ... 19 20

Case 3:
1 2 ... 14 15 [16] 17 18 19 20
1 2 ... 15 16 [17] 18 19 20
1 2 ... 16 17 [18] 19 20
1 2 ... 17 18 [19] 20
1 2 ... 18 19 [20]
*/

interface PropsType {
    queryConfig: QueryConfig
    pageSize: number
}
const RANGE = 2

export default function Pagination({ queryConfig, pageSize }: PropsType) {
    const page = Number(queryConfig.page)
    const renderPagination = () => {
        let dotAfter = false
        let dotBefore = false

        const renderDotAfter = (index: number) => {
            if (!dotAfter) {
                dotAfter = true
                return (
                    <span key={index} className='mx-2 mb-2 py-2'>
                        ....
                    </span>
                )
            }
        }
        const renderDotBefore = (index: number) => {
            if (!dotBefore) {
                dotBefore = true
                return (
                    <span key={index} className='mx-2 mb-2 py-2'>
                        ....
                    </span>
                )
            }
        }

        return Array(pageSize)
            .fill(0)
            .map((_, index) => {
                const pageNumber = index + 1

                if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
                    return renderDotAfter(index)
                } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
                    return renderDotBefore(index)
                } else if (page < pageSize - RANGE * 2 && page > RANGE * 2 + 1) {
                    if (pageNumber > RANGE && pageNumber < page - RANGE) {
                        return renderDotBefore(index)
                    } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
                        return renderDotAfter(index)
                    }
                }

                return (
                    <Link
                        to={{
                            pathname: path.home,
                            search: createSearchParams({
                                ...queryConfig,
                                page: pageNumber.toString()
                            }).toString()
                        }}
                        key={index}
                        className={classNames('mx-2 mb-2 rounded border px-3 py-2 shadow-sm ', {
                            'cursor-not-allowed bg-orange text-white': pageNumber === page,
                            'bg-white hover:bg-gray-100': pageNumber !== page
                        })}
                    >
                        {pageNumber}
                    </Link>
                )
            })
    }
    return (
        <div className='mt-6 flex flex-wrap justify-center'>
            {page <= 1 ? (
                <span className=' mx-2 mb-2 cursor-not-allowed rounded border bg-gray-100 px-3 py-2 shadow-sm'>
                    Prev
                </span>
            ) : (
                <Link
                    to={{
                        pathname: path.home,
                        search: createSearchParams({
                            ...queryConfig,
                            page: (page - 1).toString()
                        }).toString()
                    }}
                    className=' mx-2 mb-2 rounded border bg-white px-3 py-2 shadow-sm hover:bg-gray-100'
                >
                    Prev
                </Link>
            )}
            {renderPagination()}
            {page >= pageSize ? (
                <span className=' mx-2 mb-2 cursor-not-allowed rounded border bg-gray-100 px-3 py-2 shadow-sm'>
                    Next
                </span>
            ) : (
                <Link
                    to={{
                        pathname: path.home,
                        search: createSearchParams({
                            ...queryConfig,
                            page: (page + 1).toString()
                        }).toString()
                    }}
                    className=' mx-2 mb-2 rounded border bg-white px-3 py-2 shadow-sm hover:bg-gray-100'
                >
                    Next
                </Link>
            )}
        </div>
    )
}
