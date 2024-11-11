import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './components/routes/Home'
import { Editor } from './components/routes/Editor'
import { ToastContainer } from 'react-toastify'
import { VaultProvider } from './components/provider/VaultProvider'

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/editor',
            element: <Editor />,
        },
    ])

    return (
        <main className='h-full bg-background'>
            <VaultProvider>
                <RouterProvider router={router} />
            </VaultProvider>
            <ToastContainer />
        </main>
    )
}

export default App
