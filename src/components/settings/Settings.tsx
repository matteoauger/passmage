import { Button } from '../common/Button'
import { ThemeToggle } from '../ThemeToggle'
import { useVaultContext } from '../../hooks/useVault'
import { CSVImportError, exportVault, importVault } from '../../utils/csv'
import {
    createOpenFileDialog,
    createSaveFileDialog,
} from '../../utils/dialog/dialog'
import { openFile, saveFile } from '../../utils/fs'
import { FileTypes } from '../../utils/dialog/types'
import { confirm, message } from '@tauri-apps/plugin-dialog'

interface Props {
    enableExport: boolean
    enableImport: boolean
}

export function Settings({ enableExport, enableImport }: Props) {
    const [{ vault }, vaultDispatch] = useVaultContext()

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

    const handleImportClick = async () => {
        if (!enableImport) return

        const openOpenFileDialog = createOpenFileDialog(async path => {
            try {
                const csvBytes = await openFile(path)
                const consent = await confirm(
                    'You are about to import some data to your vault. Do you wish to continue?',
                    {
                        title: 'Import data',
                        kind: 'warning',
                        okLabel: 'Yes',
                        cancelLabel: 'No',
                    },
                )

                if (!consent) return

                const csv = new TextDecoder().decode(csvBytes)
                const vault = importVault(csv)
                vaultDispatch({ type: 'IMPORT_VAULT', payload: vault })
                message('Import successful')
            } catch (error: any) {
                const errorMessage =
                    error instanceof CSVImportError
                        ? error.message
                        : 'An error occurred while importing the vault'

                message(errorMessage, {
                    title: 'Import error',
                    kind: 'error',
                })
            }
        }, FileTypes.CSV)

        openOpenFileDialog()
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

            {enableImport && (
                <div className='flex items-center justify-between gap-2'>
                    <label>Import vault from CSV file</label>
                    <small>
                        The CSV file must contain 5 columns. Ordered like this :
                        <ol>
                            <li>Name</li>
                            <li>URL</li>
                            <li>Username</li>
                            <li>Password</li>
                            <li>Notes</li>
                        </ol>
                    </small>
                    <Button
                        variant='primary'
                        onClick={handleImportClick}
                        label='Import'
                    />
                </div>
            )}
        </section>
    )
}
