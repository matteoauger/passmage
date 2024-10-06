import { twMerge } from 'tailwind-merge'
import { openFileDialog, saveFileDialog } from '../../utils/dialog'
import { Button } from '../common/Button'
import { FileInput } from '../form/input/FileInput'
import { useNavigate } from 'react-router-dom'
import { invoke } from '@tauri-apps/api/core'
import { FormEvent, useEffect, useState } from 'react'
import { INPUT_CLASS } from '../../utils/styles'
import { HomeMode } from '../../models/HomeMode'

interface Props {
    filePath: string | null
    onFilePathChange: (val: string | null) => void
    onOpen: (key: string) => Promise<void>
    onSave: (key: string) => Promise<void>
    mode: HomeMode
    onModeChange: (mode: HomeMode) => void
}

export function Home({
    mode,
    onModeChange,
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

        const hash = (await invoke('hash_password', { password })) as string
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

        const hash = (await invoke('hash_password', { password })) as string
        await onSave(hash)
        navigate('/editor')
    }

    return (
        <section className='flex flex-col gap-6 items-center justify-center mt-10 h-full mx-auto max-w-xl'>
            <FileInput
                value={filePath ?? 'Select a file...'}
                onChange={(val: string) => {
                    onFilePathChange(val)
                }}
            />

            {/* On open */}
            {mode === HomeMode.Open && filePath && (
                <form
                    onSubmit={handleOpenSubmit}
                    className={twMerge('flex gap-4 items-center')}
                >
                    <input
                        name='password'
                        className={INPUT_CLASS}
                        type='password'
                        placeholder='Input master password...'
                    />
                    <Button label='>' type='submit' />
                    <Button
                        label='x'
                        onClick={() => {
                            onModeChange(HomeMode.Blank)
                            onFilePathChange(null)
                        }}
                    />
                </form>
            )}

            {/* On new */}
            {mode === HomeMode.New && (
                <form
                    onSubmit={handleSaveSubmit}
                    className={twMerge('flex flex-col gap-4 items-center')}
                >
                    <input
                        name='password'
                        className={INPUT_CLASS}
                        type='password'
                        placeholder='Enter new master password...'
                    />
                    <input
                        name='confirmPassword'
                        className={INPUT_CLASS}
                        type='password'
                        placeholder='Confirm new master password...'
                    />
                    <Button label='Create' type='submit' />
                </form>
            )}

            {mode === HomeMode.Blank && (
                <div className={twMerge('flex gap-4')}>
                    <Button
                        label='Open'
                        onClick={openFileDialog((val: string) => {
                            onModeChange(HomeMode.Open)
                            onFilePathChange(val)
                        })}
                    />
                    <Button
                        label='New'
                        onClick={saveFileDialog((val: string) => {
                            onModeChange(HomeMode.New)
                            onFilePathChange(val)
                        })}
                    />
                </div>
            )}
        </section>
    )
}
