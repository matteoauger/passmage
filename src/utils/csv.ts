import { VaultModel } from '../models/VaultModel'

export class CSVImportError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'CSVImportError'
    }
}

// Vault export
export const exportVault = (vault: VaultModel) => {
    const values = Object.values(vault)

    const header = [
        'Name',
        'URL',
        'Username',
        'Password',
        'Notes',
        'Created At',
        'Updated At',
    ].join(',')

    const csv = values
        .map(value => {
            return [
                `"${value.name}"`,
                `"${value.url}"`,
                `"${value.username}"`,
                `"${value.password}"`,
                `"${value.notes}"`,
                value.createdAtUTC
                    ? `"${new Date(value.createdAtUTC).toISOString()}"`
                    : '',
                value.updatedAtUTC
                    ? `"${new Date(value.updatedAtUTC).toISOString()}"`
                    : '',
            ].join(',')
        })
        .join('\n')

    return [header, csv].join('\n')
}

// Vault import
export const importVault = (csv: string): VaultModel => {
    const COL_LENGTH = 5
    const lines = csv.split('\n')
    const header = lines[0].split(',')
    const values = lines.slice(1).map(line => line.split(','))

    if (header.length < COL_LENGTH) {
        throw new CSVImportError(
            `The CSV file is invalid. Expecting ${COL_LENGTH} columns (name, url, username, password, notes).`,
        )
    }

    if (values.some(value => value.length < COL_LENGTH)) {
        throw new CSVImportError('The CSV file is invalid.')
    }

    if (values.length === 0) {
        throw new CSVImportError('The CSV file is empty.')
    }

    // Add the values to the vault with random UUID as keys.
    const vault: VaultModel = {}
    values.forEach(value => {
        const uuid = crypto.randomUUID()
        const unwrapQuotes = (value: string) => value.slice(1, -1)
        vault[uuid.toString()] = {
            name: unwrapQuotes(value[0]),
            url: unwrapQuotes(value[1]),
            username: unwrapQuotes(value[2]),
            password: unwrapQuotes(value[3]),
            notes: unwrapQuotes(value[4]),
            createdAtUTC: Date.now(),
            updatedAtUTC: Date.now(),
        }
    })

    return vault
}
