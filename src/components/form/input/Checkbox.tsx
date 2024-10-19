interface Props {
    label: string
    checked: boolean
    onChange: (checked: boolean) => void
}

export function Checkbox({ label, checked, onChange }: Props) {
    return (
        <label className='flex items-center gap-2'>
            <input
                type='checkbox'
                checked={checked}
                onChange={evt => onChange(evt.target.checked)}
            />
            <span>{label}</span>
        </label>
    )
}
