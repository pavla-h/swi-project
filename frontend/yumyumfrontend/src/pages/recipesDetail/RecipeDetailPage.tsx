import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Recipe } from '../../model/Recipe';
import { ApiClient } from '../../client/ApiClient';
import { User } from '../../model/User';
import { Button, Card, Form, Stack } from 'react-bootstrap';
import { UserChip } from './UserChip';

const RecipeDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [user, setUser] = useState<User[]>([])
    useEffect(() => {
        ApiClient.getRecipe(Number(id as string)).then(re => {
            setRecipe(re);
            ApiClient.getAllUsers().then(u => setUser(u));
        }).catch(err => {
            alert(err);
            navigate("/recipes");
        });
    }, [id, navigate]);

    const updateName = (newName: string) => {
        const originalRecipe = Object.assign({}, recipe);
        originalRecipe.name = newName;
        setRecipe(originalRecipe);
    };
    const updateDescription = (newDescription: string) => {
        const originalRecipe = Object.assign({}, recipe);
        originalRecipe.description = newDescription;
        setRecipe(originalRecipe);
    };
    const updateAuthor = (newAuthor: string) => {
        const originalRecipe =Object.assign({ ...recipe });
        originalRecipe.author = newAuthor;
        setRecipe(originalRecipe);
    };

    const saveChanges = () => {
        ApiClient.updateRecipe(recipe!).then(r => {
            setRecipe(r);
        }).catch(err => alert(err))
    };
    const removeUser = (userId: number) => {
        if (recipe && recipe.author) {
            const originalRecipe = { ...recipe };
            originalRecipe.author = originalRecipe.author.filter(u => u.id !== userId);
            setRecipe(originalRecipe);
        }
    };


    const addUser = (userId: string | null) => {
        if (userId && user && recipe && recipe.author) {
            const foundUser = user.find(u => u.id === Number(userId));
            if (foundUser) {
                const originalRecipe = { ...recipe };
                originalRecipe.author.push(foundUser);
                setRecipe(originalRecipe);
            }
        }
    };


    return (
        <Card className='border-primary shadow'>
            <Card.Header className='bg-primary text-light'>Recipe detail</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Recipe name</Form.Label>
                        <Form.Control value={recipe?.name} onChange={re => updateName(re.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control defaultValue={recipe?.description?.toString()} onChange={re => updateDescription(re.target.value)} type='text' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <Form.Control value={recipe?.author?.toString()} onChange={re => updateAuthor(re.target.value)} type='text' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Users</Form.Label>
                        <Stack direction='horizontal' gap={3}>
                            {recipe && Array.isArray(recipe.author) && recipe.author.map((user, index) => (
                                <UserChip deleteHandler={removeUser} key={index} user={user} />
                            ))}
                        </Stack>

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Add users</Form.Label>
                        <Form.Select onChange={re => addUser(re.target.value)}>
                            <option>Select user to add</option>
                            {
                                Array.isArray(user) && user.filter(u => !recipe?.author.some(x => x.id === u.id)).map((user, index) => (
                                    <option key={index} value={user.id}>{user.name} {user.username}({user.email})</option>
                                ))
                            }
                        </Form.Select>

                    </Form.Group>
                </Form>
            </Card.Body>
            <Card.Footer>
                <div className='d-flex flex-row justify-content-end gap-3'>
                    <Button variant='success' onClick={saveChanges}>Save</Button>
                    <Button variant='danger' onClick={() => navigate("/recipes")}>Cancel</Button>
                </div>
            </Card.Footer>
        </Card>
    )
}

export default RecipeDetailPage;