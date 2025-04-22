import React from 'react'
import { Recipe } from '../../model/Recipe'
import { Button, Card, Stack } from 'react-bootstrap'

interface RecipeViewParams {
    recipe: Recipe;
    deleteHandler: (id: number) => void;
    updateHandler: (id: number) => void;
}

const RecipeView: React.FC<RecipeViewParams> = ({ recipe: recipe, deleteHandler, updateHandler }) => {
    return (
        <Card className='border-primary shadow'>
            <Card.Header className='bg-primary text-light'>
                <strong>{recipe.name}</strong>
            </Card.Header>
            <Card.Body>
                <Stack direction='vertical' gap={1}>
                    {recipe.name ? <span>Name: {recipe.name}</span> : <></>}
                    {recipe.description ? <span>Description: {recipe.description.toLocaleString()}</span> : <></>}
                    {recipe.author && recipe.author.length > 0 ? <span>Author count: {recipe.author.length}</span> : <></>}
                </Stack>
            </Card.Body>
            <Card.Footer>
                <div className='d-flex flex-row gap-3 justify-content-around'>
                    <Button variant='primary' onClick={() => updateHandler(recipe.id)}>Update</Button>
                    <Button variant='danger' onClick={() => deleteHandler(recipe.id)}>Delete</Button>
                </div>
            </Card.Footer>
        </Card>
    );
}

export default RecipeView;