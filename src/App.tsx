import './index.css'
import { useState } from 'react'
import { VaultModel } from './models/VaultModel'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './components/routes/Home'
import { Editor } from './components/routes/Editor'
import { openFile, saveFile } from './utils/fs'
import { decrypt, encrypt } from './utils/crypto'

function App() {
    const [filePath, setFilePath] = useState<string | null>(null)
    const [key, setKey] = useState<string | null>(null)
    const [vault, setVault] = useState<VaultModel | null>({})

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
                    onOpen={async (key: string) => {
                        setKey(key)
                        //await saveVault()
                        await openVault()
                    }}
                    onSave={async (key: string) => {
                        setKey(key)
                        await saveVault()
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
