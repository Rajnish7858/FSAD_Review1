import React, { useState, useEffect } from 'react'
import { Container, Typography, Paper, Box, Chip, Grid, Card, CardContent, LinearProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton, Tabs, Tab } from '@mui/material'
import { Add, Edit, Delete, AttachFile, CheckCircle } from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'
import { students } from '../api/mockData'

const initialHomework = [
  { id: 1, title: 'FSAD Project - Phase 1', subject: 'FSAD', dueDate: '2026-03-15', description: 'Build a full-stack web application', points: 100, submissions: [{ studentId: 2, status: 'submitted', grade: 85, submittedDate: '2026-03-14' }, { studentId: 3, status: 'pending' }, { studentId: 4, status: 'pending' }] },
  { id: 2, title: 'ML Model Training', subject: 'AIML', dueDate: '2026-03-20', description: 'Train and evaluate ML models', points: 100, submissions: [{ studentId: 2, status: 'graded', grade: 92, submittedDate: '2026-03-19' }, { studentId: 3, status: 'submitted', submittedDate: '2026-03-20' }, { studentId: 4, status: 'pending' }] },
  { id: 3, title: 'Text Classification', subject: 'NLP', dueDate: '2026-03-25', description: 'Implement text classification', points: 50, submissions: [{ studentId: 2, status: 'pending' }, { studentId: 3, status: 'pending' }, { studentId: 4, status: 'pending' }] },
  { id: 4, title: 'Process Scheduling', subject: 'OS', dueDate: '2026-03-18', description: 'Implement scheduling algorithms', points: 75, submissions: [{ studentId: 2, status: 'graded', grade: 88, submittedDate: '2026-03-17' }, { studentId: 3, status: 'pending' }, { studentId: 4, status: 'submitted', submittedDate: '2026-03-18' }] }
]

export default function Homework() {
  const { user } = useAuth()
  const [homework, setHomework] = useState(() => {
    const saved = localStorage.getItem('homework')
    return saved ? JSON.parse(saved) : initialHomework
  })
  const [open, setOpen] = useState(false)
  const [gradeOpen, setGradeOpen] = useState(false)
  const [submitOpen, setSubmitOpen] = useState(false)
  const [form, setForm] = useState({ title: '', subject: 'FSAD', dueDate: '', description: '', points: 100 })
  const [gradeForm, setGradeForm] = useState({ homeworkId: null, studentId: null, grade: '' })
  const [submitForm, setSubmitForm] = useState({ homeworkId: null, comments: '', fileName: '' })
  const [editId, setEditId] = useState(null)
  const [tab, setTab] = useState(0)

  useEffect(() => {
    localStorage.setItem('homework', JSON.stringify(homework))
  }, [homework])

  const subjects = ['FSAD', 'AIML', 'NLP', 'OS']

  const handleSave = () => {
    if (editId) {
      setHomework(homework.map(h => h.id === editId ? { ...h, ...form } : h))
    } else {
      const newHomework = { id: Date.now(), ...form, submissions: students.map(s => ({ studentId: s.id, status: 'pending' })) }
      setHomework([...homework, newHomework])
    }
    setOpen(false)
    setForm({ title: '', subject: 'FSAD', dueDate: '', description: '', points: 100 })
    setEditId(null)
  }

  const handleEdit = (item) => {
    setForm({ title: item.title, subject: item.subject, dueDate: item.dueDate, description: item.description, points: item.points })
    setEditId(item.id)
    setOpen(true)
  }

  const handleDelete = (id) => {
    setHomework(homework.filter(h => h.id !== id))
  }

  const handleGrade = (homeworkId, studentId) => {
    setGradeForm({ homeworkId, studentId, grade: '' })
    setGradeOpen(true)
  }

  const handleSaveGrade = () => {
    setHomework(homework.map(h => {
      if (h.id === gradeForm.homeworkId) {
        return {
          ...h,
          submissions: h.submissions.map(s => 
            s.studentId === gradeForm.studentId ? { ...s, status: 'graded', grade: parseInt(gradeForm.grade) } : s
          )
        }
      }
      return h
    }))
    setGradeOpen(false)
    setGradeForm({ homeworkId: null, studentId: null, grade: '' })
  }

  const handleSubmit = (id) => {
    setSubmitForm({ homeworkId: id, comments: '', fileName: '' })
    setSubmitOpen(true)
  }

  const handleSaveSubmission = () => {
    setHomework(homework.map(h => {
      if (h.id === submitForm.homeworkId) {
        return {
          ...h,
          submissions: h.submissions.map(s => 
            s.studentId === user.id ? { ...s, status: 'submitted', submittedDate: new Date().toISOString().split('T')[0], comments: submitForm.comments, fileName: submitForm.fileName } : s
          )
        }
      }
      return h
    }))
    setSubmitOpen(false)
    setSubmitForm({ homeworkId: null, comments: '', fileName: '' })
  }

  const handleEditSubmission = (hw, sub) => {
    setSubmitForm({ homeworkId: hw.id, comments: sub.comments || '', fileName: sub.fileName || '' })
    setSubmitOpen(true)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSubmitForm({ ...submitForm, fileName: file.name })
    }
  }

  if (user?.role === 'teacher') {
    return (
      <Container sx={{ mt: 0 }} maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Homework Management</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Add Homework</Button>
        </Box>

        <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label="All Homework" />
          <Tab label="Submissions" />
        </Tabs>

        {tab === 0 && (
          <Grid container spacing={3}>
            {homework.map(hw => {
              const submitted = hw.submissions.filter(s => s.status === 'submitted' || s.status === 'graded').length
              const graded = hw.submissions.filter(s => s.status === 'graded').length
              return (
                <Grid item xs={12} md={6} key={hw.id}>
                  <Card sx={{ boxShadow: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6">{hw.title}</Typography>
                        <Box>
                          <IconButton size="small" onClick={() => handleEdit(hw)}>
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDelete(hw.id)}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary">{hw.description}</Typography>
                      <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip label={hw.subject} size="small" color="primary" />
                        <Chip label={`Due: ${hw.dueDate}`} size="small" />
                        <Chip label={`${hw.points} pts`} size="small" color="success" />
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="caption">Submissions: {submitted}/{hw.submissions.length} | Graded: {graded}/{hw.submissions.length}</Typography>
                        <LinearProgress variant="determinate" value={(graded / hw.submissions.length) * 100} sx={{ mt: 1 }} />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        )}

        {tab === 1 && (
          <Paper sx={{ p: 3 }}>
            {homework.map(hw => (
              <Box key={hw.id} sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>{hw.title}</Typography>
                <Grid container spacing={2}>
                  {hw.submissions.map(sub => {
                    const student = students.find(s => s.id === sub.studentId)
                    return (
                      <Grid item xs={12} md={6} key={sub.studentId}>
                        <Card variant="outlined">
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>{student?.name}</Typography>
                                <Chip 
                                  label={sub.status} 
                                  size="small" 
                                  color={sub.status === 'graded' ? 'success' : sub.status === 'submitted' ? 'info' : 'warning'}
                                  sx={{ mt: 1 }}
                                />
                                {sub.submittedDate && (
                                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>Submitted: {sub.submittedDate}</Typography>
                                )}
                                {sub.fileName && (
                                  <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>File: {sub.fileName}</Typography>
                                )}
                                {sub.comments && (
                                  <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>Comments: {sub.comments}</Typography>
                                )}
                                {sub.grade && (
                                  <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>Grade: {sub.grade}/{hw.points}</Typography>
                                )}
                              </Box>
                              {sub.status === 'submitted' && (
                                <Button size="small" variant="contained" onClick={() => handleGrade(hw.id, sub.studentId)}>Grade</Button>
                              )}
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                  })}
                </Grid>
              </Box>
            ))}
          </Paper>
        )}

        <Dialog open={open} onClose={() => { setOpen(false); setEditId(null); setForm({ title: '', subject: 'FSAD', dueDate: '', description: '', points: 100 }); }} maxWidth="sm" fullWidth>
          <DialogTitle>{editId ? 'Edit Homework' : 'Add Homework'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <TextField
              select
              label="Subject"
              fullWidth
              margin="normal"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            >
              {subjects.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
            <TextField
              label="Due Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <TextField
              label="Points"
              type="number"
              fullWidth
              margin="normal"
              value={form.points}
              onChange={(e) => setForm({ ...form, points: parseInt(e.target.value) })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setOpen(false); setEditId(null); setForm({ title: '', subject: 'FSAD', dueDate: '', description: '', points: 100 }); }}>Cancel</Button>
            <Button onClick={handleSave} variant="contained" disabled={!form.title || !form.dueDate}>Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={gradeOpen} onClose={() => setGradeOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle>Grade Submission</DialogTitle>
          <DialogContent>
            <TextField
              label="Grade"
              type="number"
              fullWidth
              margin="normal"
              value={gradeForm.grade}
              onChange={(e) => setGradeForm({ ...gradeForm, grade: e.target.value })}
              helperText={`Out of ${homework.find(h => h.id === gradeForm.homeworkId)?.points || 100}`}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setGradeOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveGrade} variant="contained" disabled={!gradeForm.grade}>Save Grade</Button>
          </DialogActions>
        </Dialog>
      </Container>
    )
  }

  return (
    <Container sx={{ mt: 0 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>My Homework</Typography>
      
      <Grid container spacing={3}>
        {homework.map(hw => {
          const mySubmission = hw.submissions.find(s => s.studentId === user.id)
          if (!mySubmission) return null
          return (
            <Grid item xs={12} md={6} key={hw.id}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">{hw.title}</Typography>
                    <Chip 
                      label={mySubmission.status} 
                      color={mySubmission.status === 'graded' ? 'success' : mySubmission.status === 'submitted' ? 'info' : 'warning'} 
                      size="small" 
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">{hw.description}</Typography>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip label={hw.subject} size="small" color="primary" />
                    <Chip label={`Due: ${hw.dueDate}`} size="small" />
                    <Chip label={`${hw.points} pts`} size="small" color="success" />
                  </Box>
                  {mySubmission.grade && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h6" color="success.main">Grade: {mySubmission.grade}/{hw.points}</Typography>
                    </Box>
                  )}
                  {mySubmission.submittedDate && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="caption" display="block">Submitted: {mySubmission.submittedDate}</Typography>
                      {mySubmission.fileName && (
                        <Typography variant="caption" display="block">File: {mySubmission.fileName}</Typography>
                      )}
                      {mySubmission.comments && (
                        <Typography variant="caption" display="block">Comments: {mySubmission.comments}</Typography>
                      )}
                    </Box>
                  )}
                  {mySubmission.status === 'pending' && (
                    <Button 
                      variant="contained" 
                      startIcon={<AttachFile />} 
                      fullWidth 
                      sx={{ mt: 2 }}
                      onClick={() => handleSubmit(hw.id)}
                    >
                      Submit Homework
                    </Button>
                  )}
                  {mySubmission.status === 'submitted' && (
                    <Button 
                      variant="outlined" 
                      startIcon={<Edit />} 
                      fullWidth 
                      sx={{ mt: 2 }}
                      onClick={() => handleEditSubmission(hw, mySubmission)}
                    >
                      Edit Submission
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <Dialog open={submitOpen} onClose={() => { setSubmitOpen(false); setSubmitForm({ homeworkId: null, comments: '', fileName: '' }); }} maxWidth="sm" fullWidth>
        <DialogTitle>Submit Homework</DialogTitle>
        <DialogContent>
          <Button
            variant="outlined"
            component="label"
            startIcon={<AttachFile />}
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            {submitForm.fileName || 'Attach File'}
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          <TextField
            label="Comments (Optional)"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={submitForm.comments}
            onChange={(e) => setSubmitForm({ ...submitForm, comments: e.target.value })}
            placeholder="Add any comments about your submission..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setSubmitOpen(false); setSubmitForm({ homeworkId: null, comments: '', fileName: '' }); }}>Cancel</Button>
          <Button onClick={handleSaveSubmission} variant="contained" disabled={!submitForm.fileName}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
