export interface VaultModel {
    [key: string]: VaultItem
}

export class VaultItem {
    name: string
    username: string
    password: string
    url: string
    notes: string

    constructor() {
        this.name = ''
        this.username = ''
        this.password = ''
        this.url = ''
        this.notes = ''
    }
}
