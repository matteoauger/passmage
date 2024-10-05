import { useNavigate } from 'react-router-dom'
import { VaultModel } from '../../models/VaultModel'
import { Button } from '../common/Button'

interface Props {
    vault: VaultModel | null
    onLock: () => void
    onChange: (vault: VaultModel) => void
}

export function Editor({ vault, onLock, onChange }: Props) {
    const navigate = useNavigate()

    return (
        <>
            <p>{JSON.stringify(vault)}</p>
            <Button
                label='Lock'
                onClick={() => {
                    // TODO
                    onLock()
                    navigate('/')
                }}
            />
        </>
    )
}
