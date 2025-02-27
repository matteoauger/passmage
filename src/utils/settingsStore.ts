import { Store } from '@tauri-apps/plugin-store'
import { Settings } from '../models/Settings'

const FILENAME = 'settings.json'
const Keys = Object.freeze({
    THEME: 'theme',
})
const store = await Store.load(FILENAME)

export const load = async (): Promise<Settings> => {
    const theme = (await store.get<Settings['theme']>(Keys.THEME)) ?? 'light'
    console.debug('theme', theme)

    return {
        theme: theme,
    }
}

export const save = async (settings: Settings) => {
    await store.set(Keys.THEME, settings.theme)
    await store.save()
}
