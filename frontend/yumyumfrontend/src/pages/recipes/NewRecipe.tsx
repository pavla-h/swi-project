import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { RecipeRequest } from '../../model/RecipeRequest';

interface NewRecipeParams {
    createHandler: (user : RecipeRequest) => void;
    externalShow : boolean;
}

export const NewRecipe: React.FC<NewRecipeParams> = ({ createHandler, externalShow }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newRecipe, setNewRecipe] = useState<RecipeRequest>(
        { name: "", description: null, author: "", authorId: 0});

    useEffect(() => {
        setShowModal(externalShow);
    }, [externalShow]);

    const refreshNewRecipe = () => {
        setNewRecipe({ name: "", description: null, author: "", authorId : 0});
    };

    const updateName = (newName: string) => {
        const originalRecipe = Object.assign({}, newRecipe);
        originalRecipe.name = newName;
        setNewRecipe(originalRecipe);
    };
    const updateDescription = (newDescription: string) => {
        const originalRecipe = Object.assign({}, newRecipe);
        originalRecipe.description = newDescription;
        setNewRecipe(originalRecipe);
    };
    const updateAuthor = (newAuthor: string) => {
        const originalRecipe = Object.assign({}, newRecipe);
        originalRecipe.author = newAuthor;
        setNewRecipe(originalRecipe);
    };
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Create recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Recipe name</Form.Label>
                        <Form.Control value={newRecipe?.name} onChange={re => updateName(re.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control defaultValue={newRecipe?.description?.toString()} onChange={re => updateDescription(re.target.value)}  />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex flex-row gap-3 justify-content-end">
                    <Button variant="success" onClick={() => createHandler(newRecipe)}>Save</Button>
                    <Button variant="danger" onClick={() => { setShowModal(false); refreshNewRecipe(); }}>Cancel</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
