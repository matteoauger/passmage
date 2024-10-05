import { twMerge } from 'tailwind-merge'
import { openFileDialog, saveFileDialog } from '../../utils/dialog'
import { Button } from '../common/Button'
import { FileInput } from '../input/FileInput'
import { useNavigate } from 'react-router-dom'
import { invoke } from '@tauri-apps/api/core'
import { FormEvent } from 'react'
import { INPUT_CLASS } from '../../utils/styles'

interface Props {
    filePath: string | null
    onFilePathChange: (val: string | null) => void
    onSubmit: (key: string) => Promise<void>
}

export function Home({ filePath, onFilePathChange, onSubmit }: Props) {
    const navigate = useNavigate()

    const handleSubmit = async (evt: FormEvent) => {
        evt.preventDefault()
        const formData = new FormData(evt.target as HTMLFormElement)
        const password = formData.get('password') as string

        if (!password) {
            return
        }

        const hash = (await invoke('hash_password', { password })) as string
        await onSubmit(hash)
        navigate('/editor')
    }

    return (
        <form
            className='flex flex-col gap-6 items-center justify-center mt-10 h-full mx-auto max-w-xl'
            onSubmit={handleSubmit}
        >
            {!filePath && (
                <FileInput
                    value={filePath ?? 'Select a file...'}
                    onChange={(val: string) => {
                        onFilePathChange(val)
                    }}
                />
            )}

            {filePath && (
                <div className={twMerge('flex gap-4 items-center')}>
                    <input
                        name='password'
                        className={INPUT_CLASS}
                        type='password'
                        placeholder='Input password...'
                    />
                    <Button label='>' type='submit' />
                </div>
            )}

            <div className={twMerge('flex gap-4')}>
                <Button
                    label='Open'
                    onClick={openFileDialog((val: string) => {
                        onFilePathChange(val)
                    })}
                />
                <Button
                    label='New'
                    onClick={saveFileDialog((val: string) => {
                        onFilePathChange(val)
                        //navigate('/editor')
                    })}
                />
            </div>
        </form>
    )
}
