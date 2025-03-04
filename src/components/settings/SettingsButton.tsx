import { faGear } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../common/Button'
import { useState } from 'react'
import { Modal } from '../common/Modal'
import { Settings } from './Settings'

interface Props {
    enableImportExport?: boolean
    className?: string
}

export function SettingsButton({
    className,
    enableImportExport = false,
}: Props) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button
                className={className}
                variant='secondary'
                icon={{ def: faGear, placement: 'left' }}
                onClick={() => setIsOpen(true)}
            />

            {isOpen && (
                <Modal show={isOpen} onClose={() => setIsOpen(false)}>
                    <Settings
                        enableExport={enableImportExport}
                        enableImport={enableImportExport}
                    />
                </Modal>
            )}
        </>
    )
}
