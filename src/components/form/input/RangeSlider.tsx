import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
    label?: string
    value: number
    onChange: (value: number) => void
    min: number
    max: number
    className?: string
}

export function RangeSlider({
    label,
    value,
    onChange,
    min,
    max,
    className,
}: Props) {
    // Represents the manually typed value, displayed above the slider.
    // Both values are bound to each other in some ways. When manual value changes, we wait for the user to press enter, then validate and synchronize the slider value.
    // If the slider is changed, the manual value gets automatically synchronized.
    let [manualValue, setManualValue] = useState(value)
    useEffect(() => {
        setManualValue(value)
    }, [value])

    const percentage = ((value - min) / (max - min)) * 100

    return (
        <div className={twMerge('flex flex-col gap-2', className)}>
            <div className='flex justify-between items-center'>
                {label && (
                    <span className='text-neutral-900 dark:text-neutral-100'>
                        {label}
                    </span>
                )}
                <div className='flex items-center gap-2'>
                    <input
                        type='number'
                        value={manualValue}
                        onChange={e => setManualValue(parseInt(e.target.value))}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                const newValue = Math.min(
                                    Math.max(manualValue || min, min),
                                    max,
                                )
                                onChange(newValue)
                            }
                        }}
                        className='w-14 text-center text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md px-2 py-1 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500'
                    />
                </div>
            </div>
            <div className='relative'>
                <input
                    type='range'
                    min={min}
                    max={max}
                    value={value}
                    onChange={e => onChange(parseInt(e.target.value))}
                    className='
                        w-full h-2 rounded-full
                        appearance-none cursor-pointer
                        bg-neutral-200 dark:bg-neutral-700
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-4
                        [&::-webkit-slider-thumb]:h-4
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-violet-500
                        [&::-webkit-slider-thumb]:hover:bg-violet-600
                        [&::-webkit-slider-thumb]:transition-colors
                        [&::-webkit-slider-thumb]:cursor-pointer
                    '
                    style={{
                        background: `linear-gradient(to right, rgb(139 92 246) 0%, rgb(139 92 246) ${percentage}%, rgb(229 231 235) ${percentage}%, rgb(229 231 235) 100%)`,
                    }}
                />
                <div className='absolute w-full flex justify-between text-xs text-neutral-500 px-1 mt-1'>
                    <span>{min}</span>
                    <span>{max}</span>
                </div>
            </div>
        </div>
    )
}
