import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import { twMerge } from 'tailwind-merge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

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

    const getCharClass = (char: string) => {
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(char))
            return 'text-red-700'
        if (/[0-9]/.test(char)) return 'text-blue-700'
        return 'text-default'
    }

    // Styling up the password to distinguish character groups.
    const valueElement = (
        <span>
            {value.split('').map((char, index) => (
                <span key={index} className={getCharClass(char)}>
                    {char}
                </span>
            ))}
        </span>
    )

    return (
        <div
            className={twMerge('relative', className)}
            onClick={handlePasswordClick}
        >
            <div
                className={twMerge(
                    ' break-words overflow-hidden cursor-pointer h-28 pr-12',
                )}
            >
                {valueElement}
            </div>
            <span className='absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3'>
                <FontAwesomeIcon
                    icon={faCopy}
                    className={twMerge('h-6 w-6 text-gray-500')}
                />
            </span>
        </div>
    )
}
