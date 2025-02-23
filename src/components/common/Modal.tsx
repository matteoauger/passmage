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
                onClick={onClose}
                className={twMerge(
                    'absolute h-full w-full bg-gray-800 opacity-70 z-10',
                )}
            ></div>

            {/* Modal content */}
            <div
                className={twMerge(
                    'relative z-20 rounded-2xl p-8 shadow-2xl w-[500px] bg-neutral-100 dark:bg-neutral-800',
                )}
            >
                <button
                    className={twMerge('absolute top-2 right-3')}
                    onClick={onClose}
                >
                    <FontAwesomeIcon
                        icon={faXmark}
                        className={twMerge(
                            'text-neutral-900 dark:text-neutral-100 hover:text-violet-800 dark:hover:text-violet-400',
                        )}
                    />
                </button>
                {children}
            </div>
        </div>,

        root,
    )
}
