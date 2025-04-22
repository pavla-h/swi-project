import React from 'react'
import { Button, Stack } from 'react-bootstrap'
import { User } from '../../model/User'

interface RecipeChipParams {
    user: User;
    deleteHandler: (id: number) => void;
}

export const UserChip: React.FC<RecipeChipParams> = ({ user, deleteHandler }) => {
    return (
        <div className='bg-info text-light p-2 rounded-3 shadow'>

            <Stack direction='horizontal' gap={2}>
                <strong>{user.name}</strong>
                <Button variant='danger' onClick={() => deleteHandler(user?.id)}>X</Button>
            </Stack>
        </div>
    )
}