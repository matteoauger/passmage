import { faFileCsv } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../common/Button'
import { ThemeToggle } from '../ThemeToggle'
import { useVaultContext } from '../../hooks/useVault'

export function Settings() {
    const [{ vault }, _] = useVaultContext()
    //const [settings, settingsDispatch] = useSettingsContext()
    function handleExportClick(): void {
        throw new Error('Function not implemented.')
    }

    return (
        <section
            className={
                'flex flex-col gap-4 text-neutral-900 dark:text-neutral-100'
            }
        >
            <h3 className='text-2xl mb-2 flex items-baseline gap-1 text-neutral-900 dark:text-neutral-100'>
                Settings
            </h3>

            <div className='flex items-center justify-between gap-2'>
                <label>Theme</label>
                <ThemeToggle />
            </div>

            {vault && (
                <div className='flex items-center justify-between gap-2'>
                    <label>Export vault to CSV</label>
                    <Button
                        variant='primary'
                        onClick={handleExportClick}
                        label='Export'
                        icon={{ def: faFileCsv, placement: 'left' }}
                    />
                </div>
            )}
        </section>
    )
}
