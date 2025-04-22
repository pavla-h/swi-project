import { useEffect, useState } from "react";
import { ApiClient } from "../../client/ApiClient";
import { Recipe } from "../../model/Recipe";
import { Button, Stack } from "react-bootstrap";
import RecipeView from "./RecipeView";
import { useNavigate } from "react-router-dom";
import { RecipeRequest } from "../../model/RecipeRequest";
import { NewRecipe } from "./NewRecipe";
import OrderItem from "./OrderItem";

const RecipePage = () => {
    const orderAttributes = ["name", "date"];
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [attribute, setAttribute] = useState<string>("date");
    const [direction, setDirection] = useState<string>("ASC");
    const [showModal, setShowModal] = useState<boolean>(false);
    useEffect(() => {
        ApiClient.getAllRecipes(attribute, direction).then(recs => setRecipes(recs)).catch(err => alert(err));
    }, [attribute, direction]);

    const onDelete = (id: number) => {
        ApiClient.deleteRecipe(id).then(() => {
            let originalList = recipes?.filter(x => x.id !== id);
            setRecipes(originalList);
        }).catch(err => alert(JSON.stringify(err)));
    };

    const onUpdate = (id: number) => {
        navigate("/recipes/" + id);
    };

    const createRecipe = (recipe: RecipeRequest) => {
        ApiClient.createRecipe(recipe).then(r => {
            let originalList = recipes.slice();
            originalList.push(r);
            setRecipes(originalList);
            setShowModal(false);
        });
    };

    return (
        <>
            <Stack direction="horizontal" gap={3}>
                <h2>Recipes</h2>
                <Button variant="success" size="sm" onClick={() => setShowModal(true)}>+</Button>
                {orderAttributes ? (
                    orderAttributes.map((name, index) => (
                        <OrderItem
                            key={index}
                            name={name}
                            selectedAttribute={attribute}
                            selectedDirection={direction}
                            changeHandler={(attribute, direction) => {
                                setAttribute(attribute);
                                setDirection(direction);
                            }}
                        />
                    ))
                ) : (
                    <p>No order attributes were found</p>
                )}
            </Stack>


            <hr />
            <Stack direction="horizontal" gap={3}>
                {recipes && recipes.length > 0 ? (
                    recipes.map((recipe, index) => (
                        <RecipeView
                            key={index}
                            recipe={recipe}
                            deleteHandler={onDelete}
                            updateHandler={onUpdate}
                        />
                    ))
                ) : (
                    <p>No recipe was found</p>
                )}
            </Stack>

            <NewRecipe externalShow={showModal} createHandler={recipe => createRecipe(recipe)} />
        </>
    );
};

export default RecipePage;