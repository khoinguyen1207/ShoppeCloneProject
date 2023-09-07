import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
    children?: ReactNode
}

interface State {
    hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className='flex h-[calc(100vh-80px)] w-full items-center justify-center bg-white p-5'>
                    <div className='text-center'>
                        <div className='inline-flex rounded-full bg-red-100 p-4'>
                            <div className='rounded-full bg-red-200 stroke-red-600 p-4'>
                                <svg
                                    className='h-16 w-16'
                                    viewBox='0 0 28 28'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14'
                                        strokeWidth={2}
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M17 16L22 21M22 16L17 21'
                                        strokeWidth={2}
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </div>
                        </div>
                        <h1 className='mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]'>500 - Server error</h1>
                        <p className='mt-5 text-slate-600 lg:text-lg'>
                            Oops something went wrong. Try to refresh this page or <br /> feel free to contact us if the
                            problem presists.
                        </p>
                        <div className='mt-6 flex flex-wrap items-center justify-center'>
                            <a
                                href='/'
                                className='my-4 flex items-center space-x-2 rounded bg-orange px-4 py-2 text-white transition duration-150 hover:bg-[#d73211]'
                                title='Return Home'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                                <span>Return Home</span>
                            </a>
                            <a
                                href='mailto:khoinguyentpvl@gmail.com'
                                className='mx-3 mt-0 flex items-center rounded border border-orange bg-orange/10 px-4 py-2 text-orange hover:bg-orange/5'
                                title='Contact'
                            >
                                <span>Contact</span>
                            </a>
                        </div>
                    </div>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary
