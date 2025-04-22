import { ApiClient } from '../client/ApiClient';

describe('ApiClient', () => {
    it('should update recipe correctly', async () => {
        // Arrange
        const recipe = { id: 1, name: 'Test Recipe', description: 'Test Description', author: [{ id: 0, name: '', email: '', username: '' }] };
        const updatedRecipe = { id: 1, name: 'Updated Recipe', description: 'Updated Description', author: [{ id: 0, name: '', email: '', username: '' }] };

        // Mock fetch
        const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: async () => updatedRecipe
        } as Response);

        // Act
        const response = await ApiClient.updateRecipe(recipe);

        // Assert
        expect(fetchSpy).toHaveBeenCalledWith("http://localhost:8080/recipes", {
            method: 'PUT',
            body: JSON.stringify({
                id: recipe.id,
                name: 'Updated Recipe',
                description: 'Updated Description',
                author: recipe.author,
                authorId: 0
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        expect(response).toEqual(updatedRecipe);

        // Restore original fetch function
        fetchSpy.mockRestore();
    });

    it('should throw error if request fails', async () => {
        // Arrange
        const errorMessage = 'Internal Server Error';

        // Mock fetch
        jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error(errorMessage));

        // Act & Assert
        await expect(ApiClient.updateRecipe({ id: 1, name: 'Test Recipe', description: 'Test Description', author: [] })).rejects.toThrow();
    });
});