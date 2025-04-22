import React from 'react'
import { Card, Stack } from 'react-bootstrap'
import { Recipe } from '../../model/Recipe'

interface RecipeChipParams {
    recipe: Recipe
}

export const RecipeChip: React.FC<RecipeChipParams> = ({recipe }) => {
    return (
        <Card className='bg-info text-light shadow'>
            <Card.Body>
                <Stack direction='vertical' gap={1}>
                    <strong>{recipe.name}</strong>
                    {recipe.description ? <span>{recipe.description.toLocaleString()}</span> : <></>}
                    {recipe.author ? <span>{recipe.author.toLocaleString()}</span> : <></>}
                </Stack>
            </Card.Body>
        </Card>
    )
}