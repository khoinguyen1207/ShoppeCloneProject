export default function Footer() {
    return (
        <footer className='bg-[#EDEDED] py-8 text-center text-sm text-[#0000008a]  sm:py-16'>
            <div className='container'>
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-3  lg:text-start'>
                    <div className='lg:col-span-1'>
                        <div>© 2023 Shopee. Tất cả các quyền được bảo lưu.</div>
                    </div>
                    <div className='lg:col-span-2 lg:text-end'>
                        <div>
                            Quốc gia & Khu vực: Singapore Indonesia Đài Loan Thái Lan Malaysia Việt Nam Philippines
                            Brazil México Colombia Chile
                        </div>
                    </div>
                </div>
                <div className='mt-16 justify-center uppercase lg:flex'>
                    <div className='lg:px-3'>Chính sách bảo mật</div>
                    <div className='lg:px-3'>Quy chế hoạt động</div>
                    <div className='lg:px-3'>Chính sách vận chuyển</div>
                    <div className='lg:px-3'>Chính sách trả hàng và hoàn tiền</div>
                </div>
                <div className='mt-5 flex justify-center'>
                    <div className='px-2 lg:px-8'>
                        <img
                            className='h-8  lg:h-12 '
                            src='https://cdn.dangkywebsitevoibocongthuong.com/wp-content/uploads/2018/06/logo.png'
                            alt='icon'
                        />
                    </div>
                    <div className='px-2 lg:px-8'>
                        <img
                            className='h-8 lg:h-12'
                            src='https://cdn.dangkywebsitevoibocongthuong.com/wp-content/uploads/2018/06/logo.png'
                            alt='icon'
                        />
                    </div>
                    <div className='px-2 lg:px-8'>
                        <img className='h-8 lg:h-12' src='https://vnnsoft.com/images/bct-hanggia.png' alt='icon' />
                    </div>
                </div>
                <div className='mb-10 mt-4'>Công ty TNHH Shopee</div>
                <div className='mt-2'>
                    Địa chỉ: Tầng 4-2-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình,
                    Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
                </div>
                <div className='mt-2'>
                    Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
                </div>
                <div className='mt-2'>
                    Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
                </div>
                <div className='mt-2'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</div>
            </div>
        </footer>
    )
}
