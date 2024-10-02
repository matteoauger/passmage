import './index.css'
import { Tile } from './components/common/Tile'
import { open, save } from '@tauri-apps/plugin-dialog'
import { invoke } from '@tauri-apps/api/core'
import {
    BaseDirectory,
    create,
    open as fsopen,
    readTextFile,
} from '@tauri-apps/plugin-fs'

const testData = [
    {
        name: 'test',
        password: 'test',
    },
]

function App() {
    const handleOpenClick = async () => {
        const path = await open({
            multiple: false,
            directory: false,
            filters: [{ name: 'Passmage Vault', extensions: ['pmv'] }],
        })

        const testPsswd = await invoke('hash_password', { password: 'test' })

        if (!path) {
            // TODO handle error
            return
        }

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

    const handleNewClick = async () => {
        const path = await save({
            defaultPath: 'Passwords.pmv',
            filters: [{ name: 'Passmage Vault', extensions: ['pmv'] }],
        })

        if (!path) {
            // Handle error
            return
        }

        console.debug(path)
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
        <div className='flex flex-col items-center mt-10'>
            <h1 className='text-5xl text-bold'>Passmage</h1>

            <div>
                <Tile label='Open' onClick={handleOpenClick} />
                <Tile label='New' onClick={handleNewClick} />
            </div>
        </div>
    )
}

export default App
