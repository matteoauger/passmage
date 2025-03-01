import { Store } from '@tauri-apps/plugin-store'
import { Settings } from '../models/Settings'

const FILENAME = 'settings.json'
const Keys = Object.freeze({
    THEME: 'theme',
})
let store: Store | null = null

const loadStore = async () => {
    if (store) return
    store = await Store.load(FILENAME)
}

export const load = async (): Promise<Settings> => {
    if (!store) await loadStore()
    const theme = (await store!.get<Settings['theme']>(Keys.THEME)) ?? 'light'

    return {
        theme: theme,
    }
}

export const save = async (settings: Settings) => {
    if (!store) await loadStore()
    await store!.set(Keys.THEME, settings.theme)
    await store!.save()
}
