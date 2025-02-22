import { TextClasses } from "../../../../common/style/textClasses";

export const InputThemeClasses = {
    Default: [
        'block',
        'text-lg',
        'w-full',
        'p-2',
        'rounded-l-lg',
        'group',
        'h-auto',
        'flex',
        'text-neutral-900',
        'dark:text-neutral-100',
        'bg-white',
        'dark:bg-neutral-800',
    ].join(' '),
    Hover: [
        'group-hover:border-violet-500',
        'group-hover:placeholder-violet-500',
        'group-hover:text-violet-500',
    ].join(' '),
    Readonly: [
        'bg-neutral-200',
        'text-neutral-500',
        'dark:bg-neutral-700',
        'dark:text-neutral-400',
        'cursor-pointer',
        'group-hover:bg-neutral-200',
        'group-hover:text-neutral-500',
        'group-hover:dark:bg-neutral-700',
        'group-hover:dark:text-neutral-400',
    ].join(' '),
    Wrapper: [
        'focus-within:border-violet-500',
        'rounded-lg',
        'border',
        'border-neutral-300',
        'dark:border-neutral-600',
        'focus-within:dark:border-violet-500',
    ].join(' '),
    embeddedLabel: [
        'text-sm',
        'text-bold',
        TextClasses.Default,
        TextClasses.Hover,
    ].join(' '),
}
