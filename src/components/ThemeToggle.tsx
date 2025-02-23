import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from './provider/ThemeProvider'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { twMerge } from 'tailwind-merge'

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, toggleTheme } = useTheme()
    return (
        <button onClick={toggleTheme} className={twMerge('text-xl', className)}>
            {theme === 'light' ? (
                <FontAwesomeIcon
                    icon={faMoon}
                    className='text-neutral-500 hover:text-neutral-700'
                />
            ) : (
                <FontAwesomeIcon
                    icon={faSun}
                    className='text-neutral-500 hover:text-neutral-300'
                />
            )}
        </button>
    )
}
