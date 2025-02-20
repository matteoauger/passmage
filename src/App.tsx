import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './components/routes/Home'
import { Editor } from './components/routes/Editor'
import { ToastContainer } from 'react-toastify'
import { VaultProvider } from './components/provider/VaultProvider'
import { ThemeProvider } from './components/provider/ThemeProvider'

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
        <ThemeProvider className='h-full bg-neutral-200 text-neutral-200 dark:bg-neutral-900 dark:text-neutral-200'>
            <VaultProvider>
                <RouterProvider router={router} />
            </VaultProvider>
            <ToastContainer />
        </ThemeProvider>
    )
}

export default App
