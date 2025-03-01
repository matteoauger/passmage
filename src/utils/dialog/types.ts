export const FileTypes: Record<string, FileType> = {
    PMV: {
        name: 'Passmage Vault',
        options: {
            multiple: false,
            directory: false,
            filters: [{ name: 'Passmage Vault', extensions: ['pmv'] }],
        },
    },
    CSV: {
        name: 'CSV',
        options: {
            multiple: false,
            directory: false,
            filters: [{ name: 'CSV', extensions: ['csv'] }],
        },
    },
} as const

export type FileType = {
    name: string
    options: {
        multiple: boolean
        directory: boolean
        filters: { name: string; extensions: string[] }[]
    }
}
