import { twMerge } from 'tailwind-merge'

export const INPUT_CLASS = Object.freeze(
    twMerge(
        'border',
        'border-black',
        'border-solid',
        'rounded-2xl',
        'p-2',
        'text-lg',
        'w-full',
        'cursor-pointer',
    ),
)
