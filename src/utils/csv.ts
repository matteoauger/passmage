import { VaultModel } from '../models/VaultModel'

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
