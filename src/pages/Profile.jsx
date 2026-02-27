import React, { useState, useEffect } from 'react'
import { Container, Typography, Paper, Box, Avatar, Grid, TextField, Button } from '@mui/material'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [phone, setPhone] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setEmail(user.email || `${user.username}@learntrack.edu`)
      
      const savedProfile = localStorage.getItem(`profile_${user.id}`)
      if (savedProfile) {
        const data = JSON.parse(savedProfile)
        setDob(data.dob || '2000-01-15')
        setPhone(data.phone || '+91 9876543210')
      } else {
        setDob('2000-01-15')
        setPhone('+91 9876543210')
      }
    }
  }, [user])

  const handleUpdate = () => {
    updateUser({ name, email })
    const profileData = { dob, phone }
    localStorage.setItem(`profile_${user?.id}`, JSON.stringify(profileData))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Container sx={{ mt: 0 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Profile</Typography>
      
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: '#1e88e5', fontSize: 32, mr: 3 }}>{name[0]}</Avatar>
          <Box>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="body2" color="text.secondary">{user?.role}</Typography>
          </Box>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              label="Date of Birth" 
              type="date" 
              value={dob} 
              onChange={(e) => setDob(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              label="Phone Number" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 XXXXXXXXXX"
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              onClick={handleUpdate}
              sx={{ bgcolor: saved ? '#4caf50' : '#1976d2' }}
            >
              {saved ? '✓ Profile Updated!' : 'Update Profile'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
