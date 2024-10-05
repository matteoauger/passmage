export interface VaultModel {
    [key: string]: VaultItem
}

export interface VaultItem {
    name: string
    username: string
    password: string
    url: string
    notes: string
}