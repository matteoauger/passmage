import { createContext, useContext, useReducer } from 'react'
import { Settings, SettingsReducerAction } from './types'

type SettingsContextType = [Settings, (action: SettingsReducerAction) => void]

const reducer = (
    prevState: Settings,
    action: SettingsReducerAction,
): Settings => {
    let state = { ...prevState }
    switch (action.type) {
        case 'TOGGLE_THEME':
            state.theme = state.theme === 'dark' ? 'light' : 'dark'
            break
    }

    return state
}

export const DefaultSettings: Settings = {
    theme: 'light',
}

export const useSettings = () => {
    return useReducer(reducer, DefaultSettings)
}

export const SettingsContext = createContext<SettingsContextType>([
    { ...DefaultSettings },
    () => {},
])

export const useSettingsContext = () => {
    return useContext(SettingsContext)
}
