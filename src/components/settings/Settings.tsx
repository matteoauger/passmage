import { Button } from '../common/Button'
import { ThemeToggle } from '../ThemeToggle'
import { useVaultContext } from '../../hooks/useVault'
import { exportVault } from '../../utils/csv'
import { createSaveFileDialog } from '../../utils/dialog/dialog'
import { saveFile } from '../../utils/fs'
import { FileTypes } from '../../utils/dialog/types'
import { message } from '@tauri-apps/plugin-dialog'

interface Props {
    enableExport: boolean
}

export function Settings({ enableExport }: Props) {
    const [{ vault }, _] = useVaultContext()

    const handleExportClick = () => {
        if (!enableExport) return
        const csv = exportVault(vault)
        const openSaveFileDialog = createSaveFileDialog(async path => {
            const bytes = new TextEncoder().encode(csv)
            await saveFile(path, bytes)
            message('Export successful')
        }, FileTypes.CSV)

        openSaveFileDialog()
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

            {enableExport && (
                <div className='flex items-center justify-between gap-2'>
                    <label>Export vault</label>
                    <Button
                        variant='primary'
                        onClick={handleExportClick}
                        label='Export'
                    />
                </div>
            )}
        </section>
    )
}
