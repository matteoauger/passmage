import { openFileDialog, saveFileDialog } from '../../utils/dialog'
import { Button } from '../common/Button'
import { FileInput } from '../form/input/FileInput'
import { HomeMode } from '../../models/HomeMode'
import { faFile, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { OpenVaultForm } from '../form/OpenVaultForm'
import { NewVaultForm } from '../form/NewVaultForm'
import { useContext, useEffect, useState } from 'react'
import { VaultContext } from '../provider/VaultProvider'
import { ThemeToggle } from '../ThemeToggle'

export function Home() {
    const [mode, setMode] = useState(HomeMode.Blank)
    const [{ fileDefinition }, { setFilepath }] = useContext(VaultContext)
    const filepath = fileDefinition.filepath

    // Automatically switch to "open" mode if the component is initialized with an existing vault filepath.
    useEffect(() => {
        if (filepath) {
            setMode(HomeMode.Open)
        }
    }, [])

    return (
        <>
            <ThemeToggle className='absolute top-4 right-4' />
            <section className='flex flex-col gap-6 items-center justify-center h-full mx-auto max-w-xl'>
                <div className='flex gap-4 w-full'>
                    <FileInput
                        className='w-full'
                        value={filepath ?? ''}
                        placeholder='Select a file...'
                        onChange={(val: string) => {
                            setFilepath(val)
                            setMode(HomeMode.Open)
                        }}
                        disabled={filepath !== null}
                    />

                    {filepath && (
                        <Button
                            icon={{ def: faXmark, placement: 'left' }}
                            onClick={() => {
                                setFilepath('')
                                setMode(HomeMode.Blank)
                            }}
                        />
                    )}
                </div>

                {/* On open */}
                {mode === HomeMode.Open && filepath && <OpenVaultForm />}

                {/* On new */}
                {mode === HomeMode.New && <NewVaultForm />}

                {/* Default */}
                {mode === HomeMode.Blank && (
                    <div className='flex gap-4'>
                        <Button
                            label='Open'
                            onClick={openFileDialog((val: string) => {
                                setFilepath(val)
                                setMode(HomeMode.Open)
                            })}
                            icon={{ def: faFile, placement: 'left' }}
                        />
                        <Button
                            label='New'
                            onClick={saveFileDialog((val: string) => {
                                setFilepath(val)
                                setMode(HomeMode.New)
                            })}
                            icon={{ def: faPlus, placement: 'left' }}
                        />
                    </div>
                )}
            </section>
        </>
    )
}
