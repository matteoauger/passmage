import { twMerge } from 'tailwind-merge'
import { openFileDialog, saveFileDialog } from '../../utils/dialog'
import { Button } from '../common/Button'
import { FileInput } from '../form/input/FileInput'
import { useNavigate } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'
import { Input } from '../../utils/styles'
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
    const navigate = useNavigate()

    const handleOpenSubmit = async (evt: FormEvent) => {
        evt.preventDefault()
        const formData = new FormData(evt.target as HTMLFormElement)
        const password = formData.get('password') as string

        if (!password) {
            return
        }

        const hash = await hashPassword(password)
        await onOpen(hash)
        navigate('/editor')
    }

    const handleSaveSubmit = async (evt: FormEvent) => {
        evt.preventDefault()
        const formData = new FormData(evt.target as HTMLFormElement)
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string

        if (password !== confirmPassword) {
            return
        }

        const hash = await hashPassword(password)
        await onSave(hash)
        navigate('/editor')
    }

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
                <form
                    onSubmit={handleOpenSubmit}
                    className={twMerge('flex flex-col gap-4 w-full')}
                >
                    <PasswordInput className='w-full' />
                    <Button
                        label='Unlock'
                        icon={{ def: faLockOpen, placement: 'left' }}
                        type='submit'
                    />
                </form>
            )}

            {/* On new */}
            {mode === HomeMode.New && (
                <form
                    onSubmit={handleSaveSubmit}
                    className={twMerge('flex flex-col gap-4 w-2/3')}
                >
                    <div>
                        <label
                            className='font-bold text-lg pb-2'
                            htmlFor='password'
                        >
                            Password
                        </label>
                        <PasswordInput name='password' />
                    </div>
                    <div>
                        <label
                            className='font-bold text-lg pb-2'
                            htmlFor='confirmPassword'
                        >
                            Confirm your password
                        </label>
                        <PasswordInput name='confirmPassword' />
                    </div>
                    <Button
                        label='Submit'
                        type='submit'
                        icon={{ def: faCheck, placement: 'left' }}
                    />
                </form>
            )}

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
