interface Props {
    password: string
}

export function PasswordBreakdown({ password }: Props) {
    const getCharClass = (char: string) => {
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(char))
            return 'text-red-700'
        if (/[0-9]/.test(char)) return 'text-blue-700'
        return 'text-neutral-900 dark:text-neutral-100'
    }

    // Styling up the password to distinguish character groups for helping the user to read it properly.
    return (
        <span>
            {password.split('').map((char, index) => (
                <span key={index} className={getCharClass(char)}>
                    {char}
                </span>
            ))}
        </span>
    )
}
