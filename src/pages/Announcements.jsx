import React, { useState, useEffect } from 'react'
import { Container, Typography, Paper, Box, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton } from '@mui/material'
import { Add, Edit, Delete } from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'

const initialAnnouncements = [
  { id: 1, title: 'Mid-term Exams Schedule Released', date: '2026-03-10', priority: 'high', message: 'Check your exam schedule on the portal' },
  { id: 2, title: 'Library Hours Extended', date: '2026-03-08', priority: 'low', message: 'Library will be open until 10 PM' },
  { id: 3, title: 'Guest Lecture on AI', date: '2026-03-12', priority: 'medium', message: 'Join us for an exciting AI lecture' },
  { id: 4, title: 'Project Submission Deadline', date: '2026-03-15', priority: 'high', message: 'Submit your projects before deadline' }
]

export default function Announcements() {
  const { user } = useAuth()
  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('announcements')
    return saved ? JSON.parse(saved) : initialAnnouncements
  })
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', date: '', priority: 'medium', message: '' })
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    localStorage.setItem('announcements', JSON.stringify(announcements))
  }, [announcements])

  const handleSave = () => {
    if (editId) {
      setAnnouncements(announcements.map(a => a.id === editId ? { ...a, ...form } : a))
    } else {
      setAnnouncements([...announcements, { id: Date.now(), ...form }])
    }
    setOpen(false)
    setForm({ title: '', date: '', priority: 'medium', message: '' })
    setEditId(null)
  }

  const handleEdit = (item) => {
    setForm({ title: item.title, date: item.date, priority: item.priority, message: item.message })
    setEditId(item.id)
    setOpen(true)
  }

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter(a => a.id !== id))
  }

  return (
    <Container sx={{ mt: 0 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Announcements</Typography>
        {user?.role === 'teacher' && (
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Add Announcement</Button>
        )}
      </Box>
      
      {announcements.map(item => (
        <Paper key={item.id} sx={{ p: 3, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{item.message}</Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>{item.date}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Chip 
                label={item.priority} 
                color={item.priority === 'high' ? 'error' : item.priority === 'medium' ? 'warning' : 'default'} 
              />
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
          </Box>
        </Paper>
      ))}

      <Dialog open={open} onClose={() => { setOpen(false); setEditId(null); setForm({ title: '', date: '', priority: 'medium', message: '' }); }} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Edit Announcement' : 'Add Announcement'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            label="Message"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
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
            label="Priority"
            fullWidth
            margin="normal"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false); setEditId(null); setForm({ title: '', date: '', priority: 'medium', message: '' }); }}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={!form.title || !form.date}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
