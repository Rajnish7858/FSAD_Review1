import React, { useState, useEffect } from 'react'
import { Container, Typography, Paper, Box, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton } from '@mui/material'
import { Add, Edit, Delete } from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'
import { api } from '../api/api'

export default function Announcements() {
  const { user } = useAuth()
  const [announcements, setAnnouncements] = useState([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', date: '', priority: 'medium', message: '' })
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    api.getAnnouncements().then(setAnnouncements).catch(() => {})
  }, [])

  const handleSave = async () => {
    if (editId) {
      const updated = await api.updateAnnouncement(editId, form)
      setAnnouncements(announcements.map(a => a.id === editId ? updated : a))
    } else {
      const created = await api.addAnnouncement(form)
      setAnnouncements([...announcements, created])
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

  const handleDelete = async (id) => {
    await api.deleteAnnouncement(id)
    setAnnouncements(announcements.filter(a => a.id !== id))
  }

  const closeDialog = () => { setOpen(false); setEditId(null); setForm({ title: '', date: '', priority: 'medium', message: '' }) }

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
              <Chip label={item.priority} color={item.priority === 'high' ? 'error' : item.priority === 'medium' ? 'warning' : 'default'} />
              {user?.role === 'teacher' && (
                <>
                  <IconButton size="small" onClick={() => handleEdit(item)}><Edit fontSize="small" /></IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(item.id)}><Delete fontSize="small" /></IconButton>
                </>
              )}
            </Box>
          </Box>
        </Paper>
      ))}

      <Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Edit Announcement' : 'Add Announcement'}</DialogTitle>
        <DialogContent>
          <TextField label="Title" fullWidth margin="normal" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <TextField label="Message" fullWidth margin="normal" multiline rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <TextField label="Date" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <TextField select label="Priority" fullWidth margin="normal" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={!form.title || !form.date}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
