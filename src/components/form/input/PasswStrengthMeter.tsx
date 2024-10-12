import { invoke } from '@tauri-apps/api/core'
import { useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
    password: string
}

enum Strength {
    VeryWeak = 1,
    Weak = 28,
    Moderate = 36,
    Strong = 60,
    VeryStrong = 120,
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
        textColor: 'text-supererror',
        bgColor: 'bg-supererror',
    },
    [Strength.Weak]: {
        label: 'Weak',
        textColor: 'text-error',
        bgColor: 'bg-error',
    },
    [Strength.Moderate]: {
        label: 'Moderate',
        textColor: 'text-warning',
        bgColor: 'bg-warning',
    },
    [Strength.Strong]: {
        label: 'Strong',
        textColor: 'text-success',
        bgColor: 'bg-success',
    },
    [Strength.VeryStrong]: {
        label: 'Very Strong',
        textColor: 'text-supersuccess',
        bgColor: 'bg-supersuccess',
    },
})

export function PasswStrengthMeter({ password }: Props) {
    let [meter, setMeter] = useState<number>(0)
    let [strength, setStrength] = useState<StrengthDefinition | null>(null)

    useEffect(() => {
        const getEntropy = async () => {
            const entropy = (await invoke('entropy', {
                password,
            })) as number

            // Calculate the strength of the password
            const strength = entropyToStrength(entropy)
            const strengthDef = StrengthDefinitions[strength]
            let entropyPercent = (entropy / (Strength.VeryStrong + 50)) * 100
            entropyPercent = Math.min(entropyPercent, 100)

            setStrength(strengthDef)
            setMeter(entropyPercent)
        }
        getEntropy()
    }, [password])

    return (
        <div>
            {strength && (
                <>
                    <span
                        className={twMerge(
                            'text-lg text-bold',
                            strength.textColor,
                        )}
                    >
                        {strength?.label}
                    </span>
                    <div className='w-full h-2 bg-gray-200 rounded-lg'>
                        <div
                            className={`h-full rounded-lg ${strength.bgColor}`}
                            style={{
                                width: `${meter}%`,
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
