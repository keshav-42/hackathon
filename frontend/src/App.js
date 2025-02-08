import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NoteList from './components/notes/NoteList';
import Navbar from './components/layout/Navbar';
import { Container } from '@mui/material';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/notes"
            element={
              <PrivateRoute>
                <NoteList />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/notes" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
