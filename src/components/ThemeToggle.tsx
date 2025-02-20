import { useTheme } from "./provider/ThemeProvider";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    return (
        <button onClick={toggleTheme} className='theme-toggle'>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    );
}
