export default function SortProductList() {
    return (
        <div className='flex flex-wrap items-center justify-center gap-3 rounded-sm bg-[#EDEDED] px-4 py-3 lg:justify-between'>
            <div className='text-center text-sm'>
                <span className='mb-2 mr-3 md:mb-0'>Sắp xếp theo</span>
                <button className='mb-2 mr-4 rounded-sm bg-orange px-3 py-2 capitalize text-white shadow-sm hover:bg-orange/75 lg:mb-0'>
                    Phổ biến
                </button>
                <button className='mb-2 mr-4 rounded-sm bg-white px-3 py-2 capitalize text-black shadow-sm hover:bg-white/60 lg:mb-0'>
                    Mới nhất
                </button>
                <button className='mb-2 mr-4 rounded-sm bg-white px-3 py-2 capitalize text-black shadow-sm hover:bg-white/60 lg:mb-0'>
                    Bán chạy
                </button>
                <select className='mr-4 rounded-sm px-3 py-2 shadow-sm outline-none '>
                    <option value=''>Giá</option>
                    <option value=''>Giá: Thấp đến Cao</option>
                    <option value=''>Giá: Cao đến Thấp</option>
                </select>
            </div>
            <div className='flex items-center '>
                <span className='mr-4'>
                    <span className='text-orange'>1</span>/9
                </span>
                <button className='flex cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60 px-3 py-[11px] shadow'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-3 w-3'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                    </svg>
                </button>
                <button className='flex items-center justify-center rounded-br-sm rounded-tr-sm bg-white px-3 py-[11px] shadow'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-3 w-3'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                    </svg>
                </button>
            </div>
        </div>
    )
}
