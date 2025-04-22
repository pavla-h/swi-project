import React, { useEffect, useState } from 'react'
import { UserRequest } from '../../model/UserRequest'
import { Button, Form, Modal } from 'react-bootstrap';

interface NewUserParams {
    createHandler: (user: UserRequest) => void;
    externalShow: boolean;
}

export const NewUser: React.FC<NewUserParams> = ({createHandler, externalShow}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<UserRequest>({ name: "", username: ""});


    useEffect(() => {
        setShowModal(externalShow);
    }, [externalShow]);

    const refreshNewUser = () => {
        setNewUser({ name: "", username: ""});
    };


    const updateName = (newName: string) => {
        const originalUser = Object.assign({}, newUser);
        originalUser.name = newName;
        setNewUser(originalUser);
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Create user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>User name</Form.Label>
                        <Form.Control value={newUser?.name} onChange={re => updateName(re.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex flex-row gap-3 justify-content-end">
                    <Button variant="success" onClick={() => createHandler(newUser)}>Save</Button>
                    <Button variant="danger" onClick={() => { setShowModal(false); refreshNewUser(); }}>Cancel</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}