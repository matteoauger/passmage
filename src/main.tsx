import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SettingsProvider } from './components/provider/SettingsProvider'
import { VaultProvider } from './components/provider/VaultProvider'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <SettingsProvider>
            <VaultProvider>
                <App />
            </VaultProvider>
            <ToastContainer />
        </SettingsProvider>
    </React.StrictMode>,
)
