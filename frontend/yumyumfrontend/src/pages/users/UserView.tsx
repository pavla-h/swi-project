import React from 'react'
import { User } from '../../model/User'
import { Button, Card, Stack } from 'react-bootstrap'

interface UserViewParams {
    user: User;
    deleteHandler: (id: number) => void;
    updateHandler: (id: number) => void;
}

const UserView :React.FC<UserViewParams> = ({user, deleteHandler, updateHandler}) => {
    return (
        <Card className='mb-3 border-primary shadow'>
            <Card.Header className='bg-primary text-light'>
                <strong>{user.name}</strong> ({user.username})
            </Card.Header>
            <Card.Body>
                <Stack gap={3} direction='horizontal'>
                    <Button variant='primary' onClick={() => updateHandler.call(this, user.id)}>Update</Button>
                    <Button variant='danger' onClick={() => deleteHandler.call(this, user.id)}>Delete</Button>
                </Stack>
            </Card.Body>
        </Card>
    )
};

export default UserView;