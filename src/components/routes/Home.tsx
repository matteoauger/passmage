import { openFileDialog, saveFileDialog } from '../../utils/dialog'
import { Button } from '../common/Button'
import { FileInput } from '../form/input/FileInput'
import { HomeMode } from '../../models/HomeMode'
import { faFile, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { OpenVaultForm } from '../form/OpenVaultForm'
import { NewVaultForm } from '../form/NewVaultForm'
import { useEffect, useState } from 'react'
import { useVaultContext } from '../../hooks/useVault'
import { SettingsButton } from '../settings/SettingsButton'

export function Home() {
    const [mode, setMode] = useState(HomeMode.Blank)
    const [{ fileDefinition }, vaultDispatch] = useVaultContext()
    const filepath = fileDefinition.filepath

    // Automatically switch to "open" mode if the component is initialized with an existing vault filepath.
    useEffect(() => {
        if (filepath) {
            setMode(HomeMode.Open)
        }
    }, [])

    return (
        <>
            <SettingsButton className='absolute top-4 right-4' />
            <section className='flex flex-col gap-6 items-center justify-center h-full mx-auto max-w-xl'>
                <div className='flex gap-4 w-full'>
                    <FileInput
                        className='w-full'
                        value={filepath ?? ''}
                        placeholder='Select a file...'
                        onChange={(filepath: string) => {
                            vaultDispatch({
                                type: 'SET_FILEPATH',
                                payload: { filepath },
                            })
                            setMode(HomeMode.Open)
                        }}
                        disabled={filepath !== null}
                    />

                    {filepath && (
                        <Button
                            icon={{ def: faXmark, placement: 'left' }}
                            onClick={() => {
                                vaultDispatch({
                                    type: 'SET_FILEPATH',
                                    payload: { filepath: '' },
                                })
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
                            onClick={openFileDialog((filepath: string) => {
                                vaultDispatch({
                                    type: 'SET_FILEPATH',
                                    payload: { filepath },
                                })
                                setMode(HomeMode.Open)
                            })}
                            icon={{ def: faFile, placement: 'left' }}
                        />
                        <Button
                            label='New'
                            onClick={saveFileDialog((filepath: string) => {
                                vaultDispatch({
                                    type: 'SET_FILEPATH',
                                    payload: { filepath },
                                })
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
