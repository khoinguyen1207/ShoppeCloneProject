import AsideFilter from 'src/components/AsideFilter'
import Product from 'src/components/Product'
import SortProductList from 'src/components/SortProductList'

const data = [
    'https://down-vn.img.susercontent.com/file/vn-11134201-23020-xijo1fvacwnv87_tn',
    'https://down-vn.img.susercontent.com/file/sg-11134201-22120-fai12qof4skv3f_tn',
    'https://down-vn.img.susercontent.com/file/ef064a8c975f2302cda91cf3ca821c98_tnhttps://down-vn.img.susercontent.com/file/ef064a8c975f2302cda91cf3ca821c98_tn',
    'https://down-vn.img.susercontent.com/file/sg-11134201-22120-560d5qv0delvfe_tn',
    'https://down-vn.img.susercontent.com/file/ed6d9d15d362eb395c42bfe156be4dcd_tn',
    'https://down-vn.img.susercontent.com/file/sg-11134201-22120-cll4309qzdlv7d_tn',
    'https://down-vn.img.susercontent.com/file/sg-11134201-22110-iwwcllt3tijvc9_tn',
    'https://down-vn.img.susercontent.com/file/sg-11134201-23010-9c75v80gesmved_tn',
    'https://down-vn.img.susercontent.com/file/050e99e4bdd52b723fe81d7c757403cf_tn',
    'https://down-vn.img.susercontent.com/file/8bcf69bffc7708026a7897ec2706ee56_tn',
    'https://down-vn.img.susercontent.com/file/vn-11134201-23020-xijo1fvacwnv87_tn',
    'https://down-vn.img.susercontent.com/file/sg-11134201-22120-fai12qof4skv3f_tn',
    'https://down-vn.img.susercontent.com/file/sg-11134201-22120-cll4309qzdlv7d_tn',
    'https://down-vn.img.susercontent.com/file/sg-11134201-22120-560d5qv0delvfe_tn',
    'https://down-vn.img.susercontent.com/file/ef064a8c975f2302cda91cf3ca821c98_tnhttps://down-vn.img.susercontent.com/file/ef064a8c975f2302cda91cf3ca821c98_tn',
    'https://down-vn.img.susercontent.com/file/ed6d9d15d362eb395c42bfe156be4dcd_tn',
    'https://down-vn.img.susercontent.com/file/sg-11134201-23010-9c75v80gesmved_tn',
    'https://down-vn.img.susercontent.com/file/8bcf69bffc7708026a7897ec2706ee56_tn',
    'https://down-vn.img.susercontent.com/file/050e99e4bdd52b723fe81d7c757403cf_tn',
    'https://down-vn.img.susercontent.com/file/sg-11134201-22110-iwwcllt3tijvc9_tn'
]

export default function ProductList() {
    return (
        <div className='bg-[#F5F5F5] py-6'>
            <div className='container'>
                <div className='grid grid-cols-1 md:grid-cols-12'>
                    <div className='md:col-span-3'>
                        <AsideFilter />
                    </div>
                    <div className='md:col-span-9'>
                        <SortProductList />
                        <div className='mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                            {data.map((item, index) => {
                                return (
                                    <div className='col-span-1' key={index}>
                                        <Product item={item} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
