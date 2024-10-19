import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'

interface Props {
    children: ReactNode
    show: boolean
    onClose: () => void
}

export default function Modal({ children, onClose, show }: Props) {
    if (!show) return null

    const root = document.getElementById('modal-root')!

    return createPortal(
        <div
            className={twMerge(
                'absolute h-full w-full flex items-center justify-center',
            )}
        >
            {/* Modal bg */}
            <div
                className={twMerge(
                    'absolute h-full w-full bg-grey-800 opacity-70 z-10',
                )}
            ></div>

            {/* Modal content */}

            <div
                className={twMerge(
                    'relative z-20 bg-white rounded-2xl p-8 shadow-2xl max-w-md',
                )}
            >
                <button
                    className={twMerge('absolute top-2 right-3')}
                    onClick={onClose}
                >
                    <FontAwesomeIcon
                        icon={faXmark}
                        className={twMerge('hover:text-primary-500')}
                    />
                </button>
                {children}
            </div>
        </div>,

        root,
    )
}
