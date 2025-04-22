import React from 'react';
import './App.css';
import {Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import UserPage from './pages/users/UserPage';
import RecipePage from './pages/recipes/RecipePage';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import { UserDetailPage } from './pages/userDetail/UserDetailPage';
import RecipeDetailPage from './pages/recipesDetail/RecipeDetailPage';

function App() {
  return (
      <div className="App">
          <Header/>
          <Container className="mt-3">
              <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/users" element={<UserPage/>}/>
                  <Route path="/user/:id" element={<UserDetailPage/>}/>
                  <Route path="/recipes" element={<RecipePage/>}/>
                  <Route path="/recipes/:id" element={<RecipeDetailPage/>}/>
                  <Route path="*" element={<h2 className="text-warning">Not found!</h2>}/>
              </Routes>
          </Container>
      </div>
  );
}

export default App;
