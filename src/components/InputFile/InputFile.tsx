import { Fragment, useRef } from 'react'
import { toast } from 'react-toastify'
import { config } from 'src/constants/config'

interface Props {
    onChange?: (file?: File) => void
}

export default function InputFile({ onChange }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleUpload = () => {
        fileInputRef.current?.click()
    }

    const handleOnChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileFromLocal = event.target.files?.[0]
        if (
            fileFromLocal &&
            (fileFromLocal.size >= config.maxsizeUploadAvatar || !fileFromLocal.type.includes('image'))
        ) {
            toast.error(`Dung lượng file tối đa 1 MB. Định dạng: .JPG, .JPEG, .PNG`, { autoClose: 1500 })
        } else {
            onChange && onChange(fileFromLocal)
        }
    }

    return (
        <Fragment>
            <input hidden type='file' ref={fileInputRef} accept='.jpg,.jpeg,.png' onChange={handleOnChangeFile}></input>
            <button type='button' onClick={handleUpload} className='border border-gray-300 px-3 py-2 capitalize'>
                Chọn ảnh
            </button>
        </Fragment>
    )
}
