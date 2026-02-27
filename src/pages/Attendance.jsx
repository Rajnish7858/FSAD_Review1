import React, { useState } from 'react'
import { Container, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, Box, Chip, Grid, Card, CardContent } from '@mui/material'
import { useAuth } from '../context/AuthContext'

export default function Attendance() {
  const { students, user } = useAuth()
  const [attendance, setAttendance] = useState({})

  const markAttendance = (studentId, status) => {
    setAttendance({ ...attendance, [studentId]: status })
  }

  const attendanceRate = Object.values(attendance).filter(s => s === 'present').length / students.length * 100 || 0

  return (
    <Container sx={{ mt: 0 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Attendance Tracker</Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }}>
            <CardContent>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>Attendance Rate</Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>{attendanceRate.toFixed(0)}%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map(st => (
              <TableRow key={st.id}>
                <TableCell>{st.name}</TableCell>
                <TableCell>
                  {attendance[st.id] ? (
                    <Chip label={attendance[st.id]} color={attendance[st.id] === 'present' ? 'success' : 'error'} />
                  ) : (
                    <Chip label="Not Marked" color="default" />
                  )}
                </TableCell>
                <TableCell>
                  <Button size="small" variant="contained" color="success" onClick={() => markAttendance(st.id, 'present')} sx={{ mr: 1 }}>Present</Button>
                  <Button size="small" variant="contained" color="error" onClick={() => markAttendance(st.id, 'absent')}>Absent</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  )
}
