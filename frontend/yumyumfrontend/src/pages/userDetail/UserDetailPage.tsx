import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { User } from '../../model/User';
import { ApiClient } from '../../client/ApiClient';
import { Recipe } from '../../model/Recipe';
import { Button, Card, Form, Stack } from 'react-bootstrap';
import { RecipeChip } from './RecipeChip';

export const UserDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [recipe, setRecipe] = useState<Recipe[]>([]);
    useEffect(() => {
        ApiClient.getUser(Number.parseInt(id as string)).then(u => {
            setUser(u);
            ApiClient.getRecipesForUser(u.id).then(recs => {
                setRecipe(recs);
            }).catch(err => alert(err));
        }).catch(err => {
            navigate("/users");
            alert(err);
        });
    }, [id, navigate]);

    const updateName = (newName: string) => {
        const originalUser = Object.assign({}, user);
        originalUser.name = newName;
        setUser(originalUser);
    };
    
    const updateUsername = (newUsername: string) => {
        const originalUser = Object.assign({}, user);
        originalUser.username = newUsername;
        setUser(originalUser);
    };
    
    const goToRecipe = (recipeId: number) => {
        navigate("/recipes/"+recipeId);
    };

    const saveChanges = () => {
        ApiClient.updateUser(user!).then(u => {
            setUser(u);
        }).catch(err => alert(err))
    };
    return (
        <Card className='border-primary shadow'>
            <Card.Header className='bg-primary text-light'>User detail</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>User name</Form.Label>
                        <Form.Control value={user?.name} onChange={re => updateName(re.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Recipes</Form.Label>
                        <Stack direction='horizontal' gap={3}>
                            {recipe ? recipe.map((recipe, index) => <span key={index} className='clickable' onClick={() => goToRecipe(recipe.id)}><RecipeChip recipe={recipe} /></span>) : <p>No recipes found</p>}
                        </Stack>
                    </Form.Group>
                </Form>
            </Card.Body>
            <Card.Footer>
                <div className='d-flex flex-row justify-content-end gap-3'>
                    <Button variant='success' onClick={saveChanges}>Save</Button>
                    <Button variant='danger' onClick={() => navigate("/users")}>Cancel</Button>
                </div>
            </Card.Footer>
        </Card>
    )
}