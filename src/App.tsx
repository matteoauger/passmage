import './index.css'
import 'react-toastify/dist/ReactToastify.css'

import { useState } from 'react'
import { VaultModel } from './models/VaultModel'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './components/routes/Home'
import { Editor } from './components/routes/Editor'
import { openFile, saveFile } from './utils/fs'
import { decrypt, encrypt } from './utils/crypto'
import { HomeMode } from './models/HomeMode'
import { ToastContainer } from 'react-toastify'

function App() {
    const [filePath, setFilePath] = useState<string | null>(null)
    const [key, setKey] = useState<string | null>(null)
    const [vault, setVault] = useState<VaultModel>({})
    const [homeMode, setHomeMode] = useState<HomeMode>(HomeMode.Blank)

    const handleFilePathChange = (val: string | null, isNew: boolean) => {
        let mode = HomeMode.Blank
        if (val) {
            mode = isNew ? HomeMode.New : HomeMode.Open
        }
        setFilePath(val)
        setHomeMode(mode)
    }

    const handleOpen = async (key: string) => {
        if (!filePath || !key) {
            return
        }
        const data = await openFile(filePath)
        const decryptedData = await decrypt(key, data)

        if (!decryptedData) {
            return
        }

        setKey(key)
        setVault(JSON.parse(decryptedData) as VaultModel)
    }

    const handleNew = async (key: string) => {
        if (!filePath || !key) {
            return
        }

        setKey(key)
        setVault({})
        await handleSave()
    }

    const handleSave = async () => {
        if (!filePath || !key || !vault) {
            return
        }

        const data = JSON.stringify(vault)
        const encryptedData = await encrypt(key, data)
        await saveFile(filePath, encryptedData)
    }

    const handleEditorChange = async (val: VaultModel) => {
        setVault(val)
        await handleSave()
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <Home
                    mode={homeMode}
                    filePath={filePath}
                    onFilePathChange={handleFilePathChange}
                    onOpen={handleOpen}
                    onCreate={handleNew}
                />
            ),
        },
        {
            path: '/editor',
            element: (
                <Editor
                    vault={vault}
                    onChange={handleEditorChange}
                    onLock={async () => {
                        await handleSave()
                        setVault({})
                        setKey(null)
                        setHomeMode(filePath ? HomeMode.Open : HomeMode.Blank)
                    }}
                />
            ),
        },
    ])

    return (
        <main className='h-full bg-background'>
            <RouterProvider router={router} />
            <ToastContainer />
        </main>
    )
}

export default App
