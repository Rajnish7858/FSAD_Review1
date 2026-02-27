import React, { useState } from 'react'
import { Container, Typography, Paper, Switch, FormControlLabel, Box, Button, TextField, Alert } from '@mui/material'

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saved, setSaved] = useState(false)

  const handleDarkMode = (checked) => {
    setDarkMode(checked)
    if (checked) {
      document.body.style.backgroundColor = '#121212'
      document.body.style.color = '#ffffff'
    } else {
      document.body.style.backgroundColor = '#f5f7fb'
      document.body.style.color = '#213547'
    }
  }

  const handleSave = () => {
    if (password && password === confirmPassword) {
      setSaved(true)
      setPassword('')
      setConfirmPassword('')
      setTimeout(() => setSaved(false), 3000)
    }
  }

  return (
    <Container sx={{ mt: 0, position: 'relative', zIndex: 1 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: darkMode ? '#fff' : 'inherit' }}>Settings</Typography>
      
      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>Settings saved successfully!</Alert>
      )}

      <Paper sx={{ p: 3, mb: 3, bgcolor: darkMode ? '#1e1e1e' : '#fff', color: darkMode ? '#fff' : 'inherit' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Appearance</Typography>
        <Box sx={{ mb: 2 }}>
          <FormControlLabel 
            control={<Switch checked={darkMode} onChange={(e) => handleDarkMode(e.target.checked)} />} 
            label="Dark Mode" 
          />
          <Typography variant="caption" display="block" color="text.secondary" sx={{ ml: 4 }}>
            {darkMode ? 'Dark mode is enabled' : 'Light mode is enabled'}
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, bgcolor: darkMode ? '#1e1e1e' : '#fff', color: darkMode ? '#fff' : 'inherit' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Change Password</Typography>
        <TextField 
          fullWidth 
          label="New Password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ 
            mb: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: darkMode ? '#666' : 'rgba(0, 0, 0, 0.23)' },
              '&:hover fieldset': { borderColor: darkMode ? '#999' : 'rgba(0, 0, 0, 0.87)' },
              '& input': { color: darkMode ? '#fff' : 'inherit' }
            },
            '& .MuiInputLabel-root': { color: darkMode ? '#aaa' : 'inherit' }
          }} 
        />
        <TextField 
          fullWidth 
          label="Confirm Password" 
          type="password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ 
            mb: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: darkMode ? '#666' : 'rgba(0, 0, 0, 0.23)' },
              '&:hover fieldset': { borderColor: darkMode ? '#999' : 'rgba(0, 0, 0, 0.87)' },
              '& input': { color: darkMode ? '#fff' : 'inherit' }
            },
            '& .MuiInputLabel-root': { color: darkMode ? '#aaa' : 'inherit' }
          }} 
        />
      </Paper>

      <Box sx={{ mt: 3, mb: 5 }}>
        <Button 
          variant="contained" 
          size="large" 
          onClick={handleSave}
          disabled={!password || password !== confirmPassword}
          sx={{ 
            bgcolor: '#1976d2', 
            color: '#fff',
            '&:hover': { bgcolor: '#1565c0' },
            '&:disabled': { bgcolor: '#ccc', color: '#666' }
          }}
        >
          {saved ? '✓ Settings Saved!' : 'Save Settings'}
        </Button>
      </Box>
    </Container>
  )
}
