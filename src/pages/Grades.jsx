import React, { useState } from 'react'
import { Container, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Chip, Box, Divider, IconButton, Collapse, Avatar, LinearProgress, Grid, Card, CardContent } from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp, TrendingUp, TrendingDown, Warning, CheckCircle, Remove } from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'
import { students } from '../api/mockData'

function StudentRow({ student, assessments, classAvg }) {
  const [open, setOpen] = useState(false)

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', color: 'success' }
    if (percentage >= 80) return { grade: 'A', color: 'success' }
    if (percentage >= 70) return { grade: 'B', color: 'info' }
    if (percentage >= 60) return { grade: 'C', color: 'warning' }
    return { grade: 'F', color: 'error' }
  }

  const subjects = [...new Set(assessments.map(a => a.title.split(' ')[0]))]
  const subjectGrades = {}
  const allScores = []

  subjects.forEach(subject => {
    const subjectAssessments = assessments.filter(a => a.title.startsWith(subject))
    const scores = []
    subjectAssessments.forEach(a => {
      const sc = a.scores.find(x => x.studentId === student.id)
      if (sc) scores.push(Math.round((sc.score / a.maxScore) * 100))
    })
    const avg = scores.length ? scores.reduce((s, x) => s + x, 0) / scores.length : 0
    subjectGrades[subject] = avg
    if (avg > 0) allScores.push(avg)
  })

  const overallAvg = allScores.length ? allScores.reduce((s, x) => s + x, 0) / allScores.length : 0
  const overallGPA = (overallAvg / 10).toFixed(2)
  const { grade: overallGrade, color: overallColor } = getGrade(overallAvg)

  const studentAssessments = assessments.filter(a => a.scores.find(s => s.studentId === student.id))
  const chronologicalScores = studentAssessments.map(a => {
    const score = a.scores.find(s => s.studentId === student.id)
    return { date: a.date, percentage: Math.round((score.score / a.maxScore) * 100) }
  }).sort((a, b) => new Date(a.date) - new Date(b.date))

  const trend = chronologicalScores.length >= 2 ? 
    chronologicalScores[chronologicalScores.length - 1].percentage - chronologicalScores[0].percentage : 0
  
  const lowScores = chronologicalScores.filter(s => s.percentage < 60).length
  const highScores = chronologicalScores.filter(s => s.percentage >= 90).length
  const attendance = 95 - (student.id * 2)
  const status = overallAvg >= classAvg ? 'Above Average' : overallAvg >= 60 ? 'Average' : 'Needs Support'

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, bgcolor: open ? '#f9f9f9' : 'inherit' }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>{student.name[0]}</Avatar>
            <Typography sx={{ fontWeight: 500 }}>{student.name}</Typography>
          </Box>
        </TableCell>
        {subjects.map(subject => {
          const avg = subjectGrades[subject]
          const { grade, color } = getGrade(avg)
          return (
            <TableCell key={subject} align="center">
              {avg > 0 ? (
                <Box>
                  <Chip label={grade} color={color} size="small" sx={{ fontWeight: 600 }} />
                  <Typography variant="caption" display="block" color="text.secondary">{avg.toFixed(1)}%</Typography>
                </Box>
              ) : '-'}
            </TableCell>
          )
        })}
        <TableCell align="center">
          <Box>
            <Chip label={`${overallGrade} (${overallGPA})`} color={overallColor} sx={{ fontWeight: 700 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 0.5 }}>
              {trend > 5 && <TrendingUp fontSize="small" color="success" />}
              {trend < -5 && <TrendingDown fontSize="small" color="error" />}
              {Math.abs(trend) <= 5 && <Remove fontSize="small" color="disabled" />}
              {lowScores > 0 && <Warning fontSize="small" color="warning" />}
            </Box>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={subjects.length + 3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={3}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="caption" color="text.secondary">Performance Status</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: overallAvg >= classAvg ? 'success.main' : 'warning.main' }}>
                        {status}
                      </Typography>
                      <Typography variant="caption">{overallAvg.toFixed(1)}% vs Class {classAvg.toFixed(1)}%</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="caption" color="text.secondary">Trend</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {trend > 0 ? <TrendingUp color="success" /> : trend < 0 ? <TrendingDown color="error" /> : <Remove />}
                        <Typography variant="h6" sx={{ fontWeight: 600, color: trend > 0 ? 'success.main' : trend < 0 ? 'error.main' : 'text.secondary' }}>
                          {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
                        </Typography>
                      </Box>
                      <Typography variant="caption">{trend > 0 ? 'Improving' : trend < 0 ? 'Declining' : 'Stable'}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="caption" color="text.secondary">Attendance</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>{attendance}%</Typography>
                      <LinearProgress variant="determinate" value={attendance} color={attendance >= 75 ? 'success' : 'warning'} sx={{ mt: 1 }} />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="caption" color="text.secondary">Performance</Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                        <Chip label={`${highScores} A+`} color="success" size="small" />
                        <Chip label={`${lowScores} Low`} color="error" size="small" />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Assessment Details</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Assessment</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Term</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="center">Score</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="center">Weight</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="center">Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assessments.map(assessment => {
                    const score = assessment.scores.find(s => s.studentId === student.id)
                    if (!score) return null
                    const percentage = Math.round((score.score / assessment.maxScore) * 100)
                    const { grade, color } = getGrade(percentage)
                    return (
                      <TableRow key={assessment.id}>
                        <TableCell>{assessment.title}</TableCell>
                        <TableCell>{assessment.term}</TableCell>
                        <TableCell>{assessment.date}</TableCell>
                        <TableCell align="center">{score.score}/{assessment.maxScore}</TableCell>
                        <TableCell align="center">{assessment.weight}%</TableCell>
                        <TableCell align="center">
                          <Chip label={`${grade} (${percentage}%)`} color={color} size="small" />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default function Grades() {
  const { assessments, user } = useAuth()

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', color: 'success', remark: 'Excellent' }
    if (percentage >= 80) return { grade: 'A', color: 'success', remark: 'Very Good' }
    if (percentage >= 70) return { grade: 'B', color: 'info', remark: 'Good' }
    if (percentage >= 60) return { grade: 'C', color: 'warning', remark: 'Average' }
    return { grade: 'F', color: 'error', remark: 'Needs Improvement' }
  }

  if (user?.role === 'teacher') {
    const subjects = [...new Set(assessments.map(a => a.title.split(' ')[0]))]
    
    const allStudentAvgs = students.map(student => {
      const scores = []
      assessments.forEach(a => {
        const sc = a.scores.find(x => x.studentId === student.id)
        if (sc) scores.push(Math.round((sc.score / a.maxScore) * 100))
      })
      return scores.length ? scores.reduce((s, x) => s + x, 0) / scores.length : 0
    })
    const classAvg = allStudentAvgs.reduce((s, x) => s + x, 0) / allStudentAvgs.length
    
    const highPerformers = allStudentAvgs.filter(a => a >= 85).length
    const needsSupport = allStudentAvgs.filter(a => a < 60).length
    const avgPerformers = students.length - highPerformers - needsSupport

    return (
      <Container sx={{ mt: 0 }} maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Grade Book - Student Monitoring</Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              <CardContent>
                <Typography variant="caption">Class Average</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{(classAvg / 10).toFixed(2)}</Typography>
                <Typography variant="body2">{classAvg.toFixed(1)}%</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
              <CardContent>
                <Typography variant="caption">High Performers</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{highPerformers}</Typography>
                <Typography variant="body2">≥85% Average</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
              <CardContent>
                <Typography variant="caption">Average Performers</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{avgPerformers}</Typography>
                <Typography variant="body2">60-84% Average</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
              <CardContent>
                <Typography variant="caption">Needs Support</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{needsSupport}</Typography>
                <Typography variant="body2">&lt;60% Average</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ p: 3, overflowX: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="body2" color="text.secondary">Indicators:</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingUp fontSize="small" color="success" />
                <Typography variant="caption">Improving</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingDown fontSize="small" color="error" />
                <Typography variant="caption">Declining</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Warning fontSize="small" color="warning" />
                <Typography variant="caption">Has Low Scores</Typography>
              </Box>
            </Box>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell sx={{ fontWeight: 600 }}>Student</TableCell>
                {subjects.map(subject => (
                  <TableCell key={subject} align="center" sx={{ fontWeight: 600 }}>{subject}</TableCell>
                ))}
                <TableCell align="center" sx={{ fontWeight: 600 }}>Overall GPA</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map(student => (
                <StudentRow key={student.id} student={student} assessments={assessments} classAvg={classAvg} />
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    )
  }

  const subjects = [...new Set(assessments.map(a => a.title.split(' ')[0]))]
  const subjectGrades = {}
  const allScores = []

  subjects.forEach(subject => {
    const subjectAssessments = assessments.filter(a => a.title.startsWith(subject))
    const scores = []
    subjectAssessments.forEach(a => {
      const sc = a.scores.find(x => x.studentId === user?.id)
      if (sc) scores.push(Math.round((sc.score / a.maxScore) * 100))
    })
    const avg = scores.length ? scores.reduce((s, x) => s + x, 0) / scores.length : 0
    subjectGrades[subject] = avg
    if (avg > 0) allScores.push(avg)
  })

  const overallAvg = allScores.length ? allScores.reduce((s, x) => s + x, 0) / allScores.length : 0
  const overallGPA = (overallAvg / 10).toFixed(2)
  const { grade: overallGrade, color: overallColor } = getGrade(overallAvg)

  return (
    <Container sx={{ mt: 0 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>My Grades</Typography>
      <Paper sx={{ p: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Course</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Grade</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map(subject => {
              const avg = subjectGrades[subject]
              const { grade, color, remark } = getGrade(avg)
              return (
                <TableRow key={subject}>
                  <TableCell>
                    <Typography sx={{ fontWeight: 500 }}>{subject}</Typography>
                  </TableCell>
                  <TableCell>
                    {avg > 0 ? (
                      <Box>
                        <Chip label={grade} color={color} size="small" sx={{ fontWeight: 600, mr: 1 }} />
                        <Typography variant="caption" color="text.secondary">({avg.toFixed(1)}%)</Typography>
                      </Box>
                    ) : (
                      <Typography variant="caption" color="text.secondary">N/A</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">{avg > 0 ? remark : '-'}</Typography>
                  </TableCell>
                </TableRow>
              )
            })}
            <TableRow>
              <TableCell colSpan={3}>
                <Divider sx={{ my: 1 }} />
              </TableCell>
            </TableRow>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell>
                <Typography sx={{ fontWeight: 700 }}>Overall GPA</Typography>
              </TableCell>
              <TableCell>
                <Chip label={`${overallGrade} (${overallGPA})`} color={overallColor} sx={{ fontWeight: 700 }} />
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: 600 }} color="text.secondary">
                  {overallAvg.toFixed(1)}% Average
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Container>
  )
}
