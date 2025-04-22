import { useEffect, useState } from "react";
import { User } from "../../model/User";
import { ApiClient } from "../../client/ApiClient";
import UserView from "./UserView";
import { Button, Form, InputGroup, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserRequest } from "../../model/UserRequest";
import { NewUser } from "./NewUser";

const UserPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const navigate = useNavigate();
    useEffect(() => {
        if (searchQuery) {
            ApiClient.searchUsers(searchQuery).then(users => {
                setUsers(users);
            }).catch(err => alert(JSON.stringify(err)));
        } else {
            ApiClient.getAllUsers().then(users => {
                setUsers(users);
            }).catch(err => alert(JSON.stringify(err)));
        }
    }, [searchQuery]);

    const onDelete = (id: number) => {
        ApiClient.deleteUser(id).then(() => {
            let originalList = users?.filter(x => x.id !== id);
            setUsers(originalList);
        }).catch(err => alert(JSON.stringify(err)));
    };

    const onUpdate = (id: number) => {
        navigate("/users/" + id);
    };

    const createUser = (newUser: UserRequest) => {
        ApiClient.createUser(newUser).then(b => {
            const originalUsers = users?.slice();
            originalUsers?.push(b);
            setShowModal(false);
            setUsers(originalUsers);
        });
    };

    return (
        <>
            <Stack direction="horizontal" gap={3}>
                <h2>Users</h2>
                <Button variant="success" size="sm" onClick={() => setShowModal(true)}>+</Button>
                <InputGroup>
                    <InputGroup.Text>Search</InputGroup.Text>
                    <Form.Control value={searchQuery} type="text" onChange={re => setSearchQuery(re.target.value)} />
                    {searchQuery ? <Button variant="danger" onClick={() => setSearchQuery("")}>X</Button> : ""}
                </InputGroup>
            </Stack>
            <hr />
            <Stack direction="horizontal" gap={3}>
                {Array.isArray(users) && users.length > 0 ? (
                    users.map((user, i) => (
                        <UserView key={i} user={user} deleteHandler={onDelete} updateHandler={onUpdate} />
                    ))
                ) : (
                    <p>No users were found</p>
                )}
            </Stack>

            <NewUser externalShow={showModal} createHandler={user => createUser(user)} />
        </>
    );
};

export default UserPage;