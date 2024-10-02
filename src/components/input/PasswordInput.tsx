interface Props {
    value: string
    placeholder: string
    onChange: (value: string) => void
}

export function PasswordInput({ value, onChange, placeholder }: Props) {
    return (
        <div>
            <input
                type='password'
                placeholder={placeholder}
                value={value}
                onChange={evt => onChange(evt.target.value)}
            />
        </div>
    )
}
