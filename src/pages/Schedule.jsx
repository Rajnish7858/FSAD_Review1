import React, { useState } from 'react'
import { Container, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton } from '@mui/material'
import { Add, Edit, Delete } from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'

export default function Schedule() {
  const { user } = useAuth()
  const [schedule, setSchedule] = useState([
    { id: 1, day: 'Monday', time: '9:00 AM - 10:30 AM', subject: 'FSAD', room: 'Lab 101' },
    { id: 2, day: 'Monday', time: '11:00 AM - 12:30 PM', subject: 'AIML', room: 'Room 205' },
    { id: 3, day: 'Tuesday', time: '9:00 AM - 10:30 AM', subject: 'NLP', room: 'Room 301' },
    { id: 4, day: 'Wednesday', time: '2:00 PM - 3:30 PM', subject: 'OS', room: 'Lab 102' },
    { id: 5, day: 'Thursday', time: '9:00 AM - 10:30 AM', subject: 'FSAD', room: 'Lab 101' },
    { id: 6, day: 'Friday', time: '11:00 AM - 12:30 PM', subject: 'AIML', room: 'Room 205' }
  ])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ day: 'Monday', time: '', subject: '', room: '' })
  const [editId, setEditId] = useState(null)

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  const handleSave = () => {
    if (editId) {
      setSchedule(schedule.map(s => s.id === editId ? { ...s, ...form } : s))
    } else {
      setSchedule([...schedule, { id: Date.now(), ...form }])
    }
    setOpen(false)
    setForm({ day: 'Monday', time: '', subject: '', room: '' })
    setEditId(null)
  }

  const handleEdit = (item) => {
    setForm({ day: item.day, time: item.time, subject: item.subject, room: item.room })
    setEditId(item.id)
    setOpen(true)
  }

  const handleDelete = (id) => {
    setSchedule(schedule.filter(s => s.id !== id))
  }

  return (
    <Container sx={{ mt: 0 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Class Schedule</Typography>
        {user?.role === 'teacher' && (
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Add Class</Button>
        )}
      </Box>
      
      <Paper sx={{ p: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Day</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Time</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Room</TableCell>
              {user?.role === 'teacher' && <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.day}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell>{item.room}</TableCell>
                {user?.role === 'teacher' && (
                  <TableCell>
                    <IconButton size="small" onClick={() => handleEdit(item)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(item.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={() => { setOpen(false); setEditId(null); setForm({ day: 'Monday', time: '', subject: '', room: '' }); }} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Edit Class' : 'Add Class'}</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Day"
            fullWidth
            margin="normal"
            value={form.day}
            onChange={(e) => setForm({ ...form, day: e.target.value })}
          >
            {days.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
          </TextField>
          <TextField
            label="Time"
            fullWidth
            margin="normal"
            placeholder="e.g., 9:00 AM - 10:30 AM"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
          <TextField
            label="Subject"
            fullWidth
            margin="normal"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />
          <TextField
            label="Room"
            fullWidth
            margin="normal"
            value={form.room}
            onChange={(e) => setForm({ ...form, room: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false); setEditId(null); setForm({ day: 'Monday', time: '', subject: '', room: '' }); }}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={!form.time || !form.subject || !form.room}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
