import { invoke } from '@tauri-apps/api/core'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
    password: string
    className?: string
}

enum Strength {
    VeryWeak = 1,
    Weak = 50,
    Moderate = 80,
    Strong = 100,
    VeryStrong = 160,
}

type StrengthDefinition = {
    label: string
    textColor: string
    bgColor: string
}

const entropyToStrength = (entropy: number) => {
    if (entropy < Strength.Weak) {
        return Strength.VeryWeak
    }
    if (entropy < Strength.Moderate) {
        return Strength.Weak
    }
    if (entropy < Strength.Strong) {
        return Strength.Moderate
    }
    if (entropy < Strength.VeryStrong) {
        return Strength.Strong
    }
    return Strength.VeryStrong
}

const StrengthDefinitions: Record<number, StrengthDefinition> = Object.freeze({
    [Strength.VeryWeak]: {
        label: 'Very Weak',
        textColor: 'text-red-900',
        bgColor: 'bg-red-900',
    },
    [Strength.Weak]: {
        label: 'Weak',
        textColor: 'text-red-700',
        bgColor: 'bg-red-700',
    },
    [Strength.Moderate]: {
        label: 'Moderate',
        textColor: 'text-amber-700',
        bgColor: 'bg-amber-700',
    },
    [Strength.Strong]: {
        label: 'Strong',
        textColor: 'text-green-700',
        bgColor: 'bg-green-700',
    },
    [Strength.VeryStrong]: {
        label: 'Amazing',
        textColor: 'text-teal-700',
        bgColor: 'bg-teal-700',
    },
})

export function PasswStrengthMeter({ password, className }: Props) {
    let [strength, setStrength] = useState<StrengthDefinition | null>(null)

    useEffect(() => {
        const getEntropy = async () => {
            const entropy = (await invoke('entropy', {
                password,
            })) as number

            // Calculate the strength of the password
            const strength = entropyToStrength(entropy)
            const strengthDef = StrengthDefinitions[strength]
            let entropyPercent = (entropy / Strength.VeryStrong) * 100
            entropyPercent = Math.min(entropyPercent, 100)

            setStrength(strengthDef)
        }
        getEntropy()
    }, [password])

    return (
        <div className={twMerge(className, password ? '' : 'invisible')}>
            {strength && (
                <>
                    <span
                        className={twMerge(
                            ' text-bold',
                            strength.bgColor,
                            'text-white',
                            'px-2',
                            'py-1',
                            'rounded',
                        )}
                    >
                        {strength?.label}
                    </span>
                </>
            )}
        </div>
    )
}
