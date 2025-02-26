import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './components/routes/Home'
import { Editor } from './components/routes/Editor'
import { useSettingsContext } from './hooks/useSettings'
import { twMerge } from 'tailwind-merge'

function App() {
    const [{ theme }, _] = useSettingsContext()
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
        <main className={twMerge(theme, 'h-full')}>
            <section className='h-full bg-neutral-100 text-neutral-200 dark:bg-neutral-900 dark:text-neutral-200'>
                <RouterProvider router={router} />
            </section>
        </main>
    )
}

export default App
