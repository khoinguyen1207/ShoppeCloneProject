import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'

interface Props {
    children?: React.ReactNode
}

export default function RegisterLayout({ children }: Props) {
    return (
        <div className='flex min-h-[100vh] flex-col justify-between'>
            <RegisterHeader />
            {children}
            <Footer />
        </div>
    )
}
