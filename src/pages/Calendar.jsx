import React, { useState, useEffect } from 'react'
import { Container, Typography, Paper, Box, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton } from '@mui/material'
import { Add, Edit, Delete } from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'

const initialEvents = [
  { id: 1, date: '2026-03-15', event: 'FSAD Insem-1', type: 'exam', description: 'Full Stack Application Development mid-term exam' },
  { id: 2, date: '2026-03-18', event: 'AIML Quiz', type: 'quiz', description: 'Machine Learning quiz' },
  { id: 3, date: '2026-03-20', event: 'NLP Assignment Due', type: 'assignment', description: 'Text classification assignment submission' },
  { id: 4, date: '2026-03-25', event: 'OS Endsem', type: 'exam', description: 'Operating Systems final exam' },
  { id: 5, date: '2026-03-28', event: 'Summer Break', type: 'holiday', description: 'Summer vacation begins' }
]

export default function Calendar() {
  const { user } = useAuth()
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('calendarEvents')
    return saved ? JSON.parse(saved) : initialEvents
  })
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ date: '', event: '', type: 'exam', description: '' })
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events))
  }, [events])

  const handleSave = () => {
    if (editId) {
      setEvents(events.map(e => e.id === editId ? { ...e, ...form } : e))
    } else {
      setEvents([...events, { id: Date.now(), ...form }])
    }
    setOpen(false)
    setForm({ date: '', event: '', type: 'exam', description: '' })
    setEditId(null)
  }

  const handleEdit = (item) => {
    setForm({ date: item.date, event: item.event, type: item.type, description: item.description })
    setEditId(item.id)
    setOpen(true)
  }

  const handleDelete = (id) => {
    setEvents(events.filter(e => e.id !== id))
  }

  return (
    <Container sx={{ mt: 0 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Academic Calendar</Typography>
        {user?.role === 'teacher' && (
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Add Event</Button>
        )}
      </Box>
      
      {events.map((item) => (
        <Paper key={item.id} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">{item.event}</Typography>
            <Typography variant="body2" color="text.secondary">{item.description}</Typography>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>{item.date}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip label={item.type} color="primary" />
            {user?.role === 'teacher' && (
              <>
                <IconButton size="small" onClick={() => handleEdit(item)}>
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => handleDelete(item.id)}>
                  <Delete fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
        </Paper>
      ))}

      <Dialog open={open} onClose={() => { setOpen(false); setEditId(null); setForm({ date: '', event: '', type: 'exam', description: '' }); }} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Edit Event' : 'Add Event'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Event Name"
            fullWidth
            margin="normal"
            value={form.event}
            onChange={(e) => setForm({ ...form, event: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <TextField
            select
            label="Type"
            fullWidth
            margin="normal"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <MenuItem value="exam">Exam</MenuItem>
            <MenuItem value="quiz">Quiz</MenuItem>
            <MenuItem value="assignment">Assignment</MenuItem>
            <MenuItem value="holiday">Holiday</MenuItem>
            <MenuItem value="event">Event</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false); setEditId(null); setForm({ date: '', event: '', type: 'exam', description: '' }); }}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={!form.event || !form.date}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
