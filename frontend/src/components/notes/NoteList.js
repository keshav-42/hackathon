import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import NoteCard from './NoteCard';
import NoteDialog from './NoteDialog';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/notes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = () => {
    setSelectedNote(null);
    setOpen(true);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setOpen(true);
  };

  const handleDeleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNote(null);
  };

  const handleSave = async (noteData) => {
    try {
      const token = localStorage.getItem('token');
      if (selectedNote) {
        const response = await axios.put(
          `http://localhost:5000/api/notes/${selectedNote.id}`,
          noteData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotes(notes.map(note => 
          note.id === selectedNote.id ? response.data : note
        ));
      } else {
        const response = await axios.post(
          'http://localhost:5000/api/notes',
          noteData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotes([response.data, ...notes]);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Notes
      </Typography>
      <Grid container spacing={3}>
        {notes.map(note => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <NoteCard
              note={note}
              onEdit={() => handleEditNote(note)}
              onDelete={() => handleDeleteNote(note.id)}
            />
          </Grid>
        ))}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleAddNote}
      >
        <AddIcon />
      </Fab>
      <NoteDialog
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        note={selectedNote}
      />
    </Container>
  );
};

export default NoteList;
