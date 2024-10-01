import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { invoke } from '@tauri-apps/api/core'
import './App.css'
import './index.css'

const testData = [{
    "name": "test",
    "password": "test"
}]

function App() {
    const [password, setPassword] = useState('')
    const [key, setKey] = useState('')
    const [encryptedData, setEncryptedData] = useState('')
    const [decryptedData, setDecryptedData] = useState('')

    async function testEncryption() {
        // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        const key = await invoke('hash_password', { password })
        setKey(key)
        const encryptedData = await invoke('encrypt', { contents: JSON.stringify(testData), key })
        setEncryptedData(encryptedData)
        const decryptedData = await invoke('decrypt', { contents: encryptedData, key })
        setDecryptedData(decryptedData)
    }

    return (
        <div className='container'>
            <h1>Welcome to Tauri!</h1>

            <div className='row'>
                <a href='https://vitejs.dev' target='_blank'>
                    <img
                        src='/vite.svg'
                        className='logo vite'
                        alt='Vite logo'
                    />
                </a>
                <a href='https://tauri.app' target='_blank'>
                    <img
                        src='/tauri.svg'
                        className='logo tauri'
                        alt='Tauri logo'
                    />
                </a>
                <a href='https://reactjs.org' target='_blank'>
                    <img
                        src={reactLogo}
                        className='logo react'
                        alt='React logo'
                    />
                </a>
            </div>

            <p>Click on the Tauri, Vite, and React logos to learn more.</p>

            <form
                className='row'
                onSubmit={e => {
                    e.preventDefault()
                    testEncryption()
                }}
            >
                <input
                    onChange={e => setPassword(e.currentTarget.value)}
                    placeholder='Enter a password...'
                />
                <button type='submit'>Test encryption</button>
            </form>

            <p>{JSON.stringify(testData)}</p>
            <p>{key}</p>
            <p>{encryptedData}</p>
            <p>{decryptedData}</p>
        </div>
    )
}

export default App
