import './index.css'
import { Button } from './components/common/Button'

import { FileInput } from './components/input/FileInput'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'
import { openFileDialog, saveFileDialog } from './utils/dialog'
import { VaultModel } from './models/VaultModel'
import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
} from 'react-router-dom'
import { Home } from './components/routes/Home'
import { Editor } from './components/routes/Editor'
import { useEncryptedFile } from './hooks/useEncryptedFile'
import { openFile, saveFile } from './utils/fs'
import { decrypt, encrypt } from './utils/crypto'

const testData = [
    {
        name: 'test',
        password: 'test',
    },
]

const testVault = {
    test: {
        name: 'test',
        username: 'test',
        password: 'test',
        url: 'test',
        notes: 'test',
    },
}

function App() {
    const [filePath, setFilePath] = useState<string | null>(null)
    const [key, setKey] = useState<string | null>(null)
    const [vault, setVault] = useState<VaultModel | null>(testVault)

    const openVault = async () => {
        if (!filePath || !key) {
            return
        }
        const data = await openFile(filePath)
        const decryptedData = await decrypt(key, data)

        if (!decryptedData) {
            return
        }

        setVault(JSON.parse(decryptedData) as VaultModel)
        console.debug(JSON.parse(decryptedData) as VaultModel)
    }

    const saveVault = async () => {
        if (!filePath || !key || !vault) {
            return
        }

        const data = JSON.stringify(vault)
        const encryptedData = await encrypt(key, data)
        await saveFile(filePath, encryptedData)
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <Home
                    filePath={filePath}
                    onFilePathChange={val => setFilePath(val)}
                    onSubmit={async (key: string) => {
                        setKey(key)
                        //await saveVault()
                        await openVault()
                    }}
                />
            ),
        },
        {
            path: '/editor',
            element: (
                <Editor
                    vault={vault}
                    onChange={val => setVault(val)}
                    onLock={async () => {
                        await saveVault()
                    }}
                />
            ),
        },
    ])

    return (
        <main>
            <RouterProvider router={router} />
        </main>
    )
}

export default App

// import { open, save } from '@tauri-apps/plugin-dialog'
// import { invoke } from '@tauri-apps/api/core'
// import {
//     BaseDirectory,
//     create,
//     open as fsopen,
//     readFile,
//     readTextFile,
// } from '@tauri-apps/plugin-fs'
//
//
// const openFile = async (path: string) => {
//     const testPsswd = await invoke('hash_password', { password: 'test' })

//     console.debug(path)
//     const file = await fsopen(path, {
//         read: true,
//         baseDir: BaseDirectory.Home,
//     })
//     const contents = await readFile(path, {
//         baseDir: BaseDirectory.Home,
//     })

//     const decryptedData = (await invoke('decrypt', {
//         contents: contents,
//         key: testPsswd,
//     })) as string

//     console.debug('file', file)
//     console.debug('text:', contents)
//     console.debug('decrypted:', JSON.parse(decryptedData))
// }

// const createFile = async (path: string) => {
//     const testPsswd = await invoke('hash_password', { password: 'test' })
//     const initialValue = JSON.stringify({
//         foo: 'bar',
//     })
//     const encryptedData = (await invoke('encrypt', {
//         contents: initialValue,
//         key: testPsswd,
//     })) as Uint8Array

//     // Write file on the disk
//     const file = await create(path)
//     await file.write(encryptedData)
//     await file.close()
// }
