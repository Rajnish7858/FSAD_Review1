import React, { useState } from 'react'
import { Container, Typography, Grid, Card, CardContent, Box, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'
import { courses as initialCourses } from '../api/mockData'

export default function Courses() {
  const { user } = useAuth()
  const [courses, setCourses] = useState(initialCourses)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ code: '', name: '', credits: 4 })

  const handleAdd = () => {
    setCourses([...courses, { id: Date.now(), ...form }])
    setOpen(false)
    setForm({ code: '', name: '', credits: 4 })
  }

  const handleDelete = (id) => {
    setCourses(courses.filter(c => c.id !== id))
  }

  return (
    <Container sx={{ mt: 0 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Courses</Typography>
        {user?.role === 'teacher' && (
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Add Course</Button>
        )}
      </Box>
      
      <Grid container spacing={3}>
        {courses.map(course => (
          <Grid item xs={12} md={6} key={course.id}>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>{course.code}</Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip label="Active" color="success" />
                    {user?.role === 'teacher' && (
                      <Button size="small" color="error" onClick={() => handleDelete(course.id)}>Delete</Button>
                    )}
                  </Box>
                </Box>
                <Typography variant="body1" color="text.secondary">{course.name}</Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">Credits: {course.credits || 4} | Year: 2026</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <TextField
            label="Course Code"
            fullWidth
            margin="normal"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />
          <TextField
            label="Course Name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Credits"
            type="number"
            fullWidth
            margin="normal"
            value={form.credits}
            onChange={(e) => setForm({ ...form, credits: parseInt(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained" disabled={!form.code || !form.name}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
