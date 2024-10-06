import { BaseDirectory, create, readFile } from '@tauri-apps/plugin-fs'

export async function openFile(path: string): Promise<Uint8Array> {
    const contents = await readFile(path, {
        baseDir: BaseDirectory.Home,
    })

    return contents
}

export async function saveFile(path: string, contents: Uint8Array) {
    // Write file on the disk
    const file = await create(path)
    await file.write(contents)
    await file.close()
}
