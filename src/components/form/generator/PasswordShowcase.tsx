import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import { twMerge } from 'tailwind-merge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { PasswordBreakdown } from '../../common/PasswordBreakdown'

interface Props {
    className?: string
    value: string
}

export function PasswordShowcase({ value, className }: Props) {
    const handlePasswordClick = async () => {
        toast.success('Password copied to clipboard', {
            position: 'top-center',
        })
        await writeText(value)
    }

    return (
        <div
            className={twMerge('relative border border-gray-300 rounded-lg p-2', className)}
            onClick={handlePasswordClick}
        >
            <div
                className='break-all overflow-hidden cursor-pointer pr-12'
            >
                <PasswordBreakdown password={value} />
            </div>
            <span className='absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3'>
                <FontAwesomeIcon
                    icon={faCopy}
                    className={'h-6 w-6 text-gray-500'}
                />
            </span>
        </div>
    )
}
