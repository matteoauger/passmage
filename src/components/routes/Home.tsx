import { twMerge } from 'tailwind-merge'
import { openFileDialog, saveFileDialog } from '../../utils/dialog'
import { Button } from '../common/Button'
import { FileInput } from '../form/input/FileInput'
import { useNavigate } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'
import { InputStyles } from '../../utils/styles'
import { HomeMode } from '../../models/HomeMode'
import { hashPassword } from '../../utils/crypto'
import {
    faCheck,
    faChevronRight,
    faFile,
    faLockOpen,
    faPlus,
    faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { PasswordInput } from '../form/input/PasswordInput'
import { OpenVaultForm } from '../form/OpenVaultForm'
import { NewVaultForm } from '../form/NewVaultForm'

interface Props {
    filePath: string | null
    onFilePathChange: (val: string | null, isNew: boolean) => void
    onOpen: (key: string) => Promise<void>
    onSave: (key: string) => Promise<void>
    mode: HomeMode
}

export function Home({
    mode,
    filePath,
    onFilePathChange,
    onOpen,
    onSave,
}: Props) {
    return (
        <section
            className={twMerge(
                'flex flex-col gap-6 items-center justify-center h-full mx-auto max-w-xl',
            )}
        >
            <div className='flex gap-4 items-center w-full'>
                <FileInput
                    className='w-full'
                    value={filePath ?? ''}
                    placeholder='Select a file...'
                    onChange={(val: string) => {
                        onFilePathChange(val, false)
                    }}
                    disabled={filePath !== null}
                />

                {filePath && (
                    <Button
                        icon={{ def: faXmark, placement: 'left' }}
                        onClick={() => {
                            onFilePathChange(null, false)
                        }}
                    />
                )}
            </div>

            {/* On open */}
            {mode === HomeMode.Open && filePath && (
                <OpenVaultForm onSubmit={onOpen} />
            )}

            {/* On new */}
            {mode === HomeMode.New && <NewVaultForm onSave={onSave} />}

            {mode === HomeMode.Blank && (
                <div className={twMerge('flex gap-4')}>
                    <Button
                        label='Open'
                        onClick={openFileDialog((val: string) => {
                            onFilePathChange(val, false)
                        })}
                        icon={{ def: faFile, placement: 'left' }}
                    />
                    <Button
                        label='New'
                        onClick={saveFileDialog((val: string) => {
                            onFilePathChange(val, true)
                        })}
                        icon={{ def: faPlus, placement: 'left' }}
                    />
                </div>
            )}
        </section>
    )
}
