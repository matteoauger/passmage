import './index.css'
import { Button } from './components/common/Button'
import { open, save } from '@tauri-apps/plugin-dialog'
import { invoke } from '@tauri-apps/api/core'
import {
    BaseDirectory,
    create,
    open as fsopen,
    readTextFile,
} from '@tauri-apps/plugin-fs'
import { FileInput } from './components/input/FileInput'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'
import { openFileDialog, saveFileDialog } from './utils/dialog'

const testData = [
    {
        name: 'test',
        password: 'test',
    },
]

function App() {
    const [file, setFile] = useState<string | null>(null)

    const openFile = async (path: string) => {
        const testPsswd = await invoke('hash_password', { password: 'test' })

        console.debug(path)
        const file = await fsopen(path, {
            read: true,
            baseDir: BaseDirectory.Home,
        })
        const contents = await readTextFile(path, {
            baseDir: BaseDirectory.Home,
        })

        const decryptedData = (await invoke('decrypt', {
            contents: contents,
            key: testPsswd,
        })) as string

        console.debug('file', file)
        console.debug('text:', contents)
        console.debug('decrypted:', JSON.parse(decryptedData))
    }

    const createFile = async (path: string) => {
        const testPsswd = await invoke('hash_password', { password: 'test' })
        const initialValue = JSON.stringify({
            foo: 'bar',
        })
        const encryptedData = (await invoke('encrypt', {
            contents: initialValue,
            key: testPsswd,
        })) as string

        // Write file on the disk
        const file = await create(path)
        await file.write(new TextEncoder().encode(encryptedData))
        await file.close()
    }

    return (
        <div className='flex flex-col gap-6 items-center mt-10 mx-auto max-w-xl'>
            <h1 className='text-5xl text-bold'>Passmage</h1>

            <FileInput
                value={file ?? 'Select a file...'}
                onChange={(val: string) => {
                    setFile(val)
                    openFile(val)
                }}
            />
            <div className={twMerge('flex gap-4')}>
                <Button
                    label='Open'
                    onClick={openFileDialog((val: string) => {
                        setFile(val)
                        openFile(val)
                    })}
                />
                <Button
                    label='New'
                    onClick={saveFileDialog((val: string) => {
                        setFile(val)
                        createFile(val)
                    })}
                />
            </div>
        </div>
    )
}

export default App
