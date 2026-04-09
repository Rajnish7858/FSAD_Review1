import React from 'react'
import { Box, Button, Typography, Grid, Card, CardContent, Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { School, BarChart, Assignment, CalendarMonth, MenuBook, Groups, Login, Dashboard, TrackChanges } from '@mui/icons-material'

const features = [
  { icon: <School fontSize="large" />, title: 'Smart Dashboards', desc: 'Role-based dashboards for teachers and students with real-time insights.', color: '#667eea' },
  { icon: <BarChart fontSize="large" />, title: 'Grade Analytics', desc: 'Track performance trends, GPA, and subject-wise breakdowns visually.', color: '#f093fb' },
  { icon: <Assignment fontSize="large" />, title: 'Homework Management', desc: 'Assign, submit, and grade homework with file attachments.', color: '#4facfe' },
  { icon: <CalendarMonth fontSize="large" />, title: 'Academic Calendar', desc: 'Stay updated with exams, quizzes, holidays and events.', color: '#43e97b' },
  { icon: <MenuBook fontSize="large" />, title: 'Library Access', desc: 'Browse and borrow books from the digital library catalog.', color: '#fa709a' },
  { icon: <Groups fontSize="large" />, title: 'Student Monitoring', desc: "Teachers can monitor each student's progress and attendance.", color: '#f6d365' },
]

const steps = [
  { icon: <Login fontSize="large" />, step: '01', title: 'Sign In', desc: 'Login with your credentials as a teacher or student to access your personalized portal.', color: '#667eea' },
  { icon: <Dashboard fontSize="large" />, step: '02', title: 'Access Dashboard', desc: 'View your dashboard with grades, homework, announcements, and performance analytics.', color: '#f093fb' },
  { icon: <TrackChanges fontSize="large" />, step: '03', title: 'Track & Improve', desc: 'Teachers monitor students, assign homework, and update grades. Students submit and track progress.', color: '#4facfe' },
]

const roles = [
  {
    title: 'For Teachers',
    color: '#667eea',
    points: [
      'Manage and grade assessments',
      'Monitor each student\'s performance',
      'Assign homework and track submissions',
      'Post announcements and calendar events',
      'Manage courses and class schedule',
      'Generate performance reports',
    ]
  },
  {
    title: 'For Students',
    color: '#f093fb',
    points: [
      'View grades and GPA across subjects',
      'Submit homework with file attachments',
      'Track attendance and progress',
      'Access library and borrow books',
      'Stay updated with announcements',
      'View class schedule and calendar',
    ]
  }
]

export default function Home() {
  const nav = useNavigate()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box sx={{ minHeight: '100vh', background: '#0a0a1a', color: '#fff', overflowX: 'hidden' }}>

      {/* Navbar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 6, py: 2.5, position: 'fixed', top: 0, width: '100%', zIndex: 100, backdropFilter: 'blur(10px)', background: 'rgba(10,10,26,0.85)', boxSizing: 'border-box' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #667eea, #f093fb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          LearnTrack
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button onClick={() => scrollTo('features')} sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#fff' } }}>Features</Button>
          <Button onClick={() => scrollTo('how-it-works')} sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#fff' } }}>How It Works</Button>
          <Button variant="outlined" onClick={() => nav('/login')} sx={{ borderColor: '#667eea', color: '#667eea', fontWeight: 600, borderRadius: 2, '&:hover': { background: '#667eea', color: '#fff' } }}>
            Sign In
          </Button>
        </Box>
      </Box>

      {/* Hero Section */}
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', px: 3, position: 'relative', pt: 8 }}>
        <Box sx={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(102,126,234,0.25) 0%, transparent 70%)', top: '10%', left: '5%', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,147,251,0.2) 0%, transparent 70%)', bottom: '10%', right: '5%', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,172,254,0.15) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <Box sx={{ display: 'inline-block', px: 2.5, py: 0.8, mb: 3, borderRadius: 10, border: '1px solid rgba(102,126,234,0.5)', background: 'rgba(102,126,234,0.1)' }}>
          <Typography variant="caption" sx={{ color: '#a78bfa', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
            University Learning Platform
          </Typography>
        </Box>

        <Typography variant="h2" sx={{ fontWeight: 900, lineHeight: 1.15, mb: 3, fontSize: { xs: '2.5rem', md: '4rem' } }}>
          Track. Analyze.
          <Box component="span" sx={{ display: 'block', background: 'linear-gradient(135deg, #667eea 0%, #f093fb 50%, #4facfe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Achieve More.
          </Box>
        </Typography>

        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, mb: 5, fontWeight: 400, lineHeight: 1.8 }}>
          A powerful platform for teachers and students to manage grades, homework, attendance, and learning outcomes — all in one place.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => nav('/login')}
            sx={{ px: 5, py: 1.8, fontWeight: 700, fontSize: '1rem', borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 8px 32px rgba(102,126,234,0.4)', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 40px rgba(102,126,234,0.6)' }, transition: 'all 0.3s' }}
          >
            Get Started →
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => scrollTo('features')}
            sx={{ px: 5, py: 1.8, fontWeight: 700, fontSize: '1rem', borderRadius: 3, borderColor: 'rgba(255,255,255,0.2)', color: '#fff', '&:hover': { borderColor: '#667eea', background: 'rgba(102,126,234,0.1)' }, transition: 'all 0.3s' }}
          >
            Learn More ↓
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: { xs: 4, md: 8 }, mt: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[['3+', 'Students'], ['4', 'Courses'], ['10+', 'Features'], ['100%', 'Tracked']].map(([val, label]) => (
            <Box key={label} sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #667eea, #f093fb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{val}</Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mt: 0.5 }}>{label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ px: { xs: 3, md: 10 }, py: 10 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, textAlign: 'center', mb: 1 }}>Everything You Need</Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', mb: 6 }}>
          Powerful tools for both teachers and students
        </Typography>
        <Grid container spacing={3}>
          {features.map((f) => (
            <Grid item xs={12} sm={6} md={4} key={f.title}>
              <Card sx={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 3, p: 1, height: '100%', transition: 'all 0.3s', cursor: 'default', '&:hover': { transform: 'translateY(-6px)', border: `1px solid ${f.color}66`, boxShadow: `0 12px 40px ${f.color}22` } }}>
                <CardContent>
                  <Box sx={{ color: f.color, mb: 2 }}>{f.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', mb: 1 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* How It Works Section */}
      <Box id="how-it-works" sx={{ px: { xs: 3, md: 10 }, py: 10, background: 'rgba(255,255,255,0.02)' }}>
        <Typography variant="h4" sx={{ fontWeight: 800, textAlign: 'center', mb: 1 }}>How It Works</Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', mb: 8 }}>
          Get up and running in 3 simple steps
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {steps.map((s, i) => (
            <Grid item xs={12} md={4} key={s.step}>
              <Box sx={{ textAlign: 'center', position: 'relative' }}>
                {i < steps.length - 1 && (
                  <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', top: 40, left: '60%', width: '80%', height: 2, background: 'linear-gradient(90deg, rgba(102,126,234,0.5), transparent)', zIndex: 0 }} />
                )}
                <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 3, background: `linear-gradient(135deg, ${s.color}33, ${s.color}11)`, border: `2px solid ${s.color}66`, color: s.color, position: 'relative', zIndex: 1 }}>
                  {s.icon}
                </Avatar>
                <Typography variant="caption" sx={{ color: s.color, fontWeight: 700, letterSpacing: 2 }}>{s.step}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mt: 1, mb: 1 }}>{s.title}</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 280, mx: 'auto' }}>{s.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Roles Section */}
      <Box sx={{ px: { xs: 3, md: 10 }, py: 10 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, textAlign: 'center', mb: 1 }}>Built for Everyone</Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', mb: 6 }}>
          Tailored experience for each role
        </Typography>
        <Grid container spacing={4}>
          {roles.map((r) => (
            <Grid item xs={12} md={6} key={r.title}>
              <Card sx={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${r.color}33`, borderRadius: 3, p: 1, height: '100%', transition: 'all 0.3s', '&:hover': { border: `1px solid ${r.color}66`, boxShadow: `0 12px 40px ${r.color}22` } }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, background: `linear-gradient(135deg, ${r.color}, #fff)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{r.title}</Typography>
                  {r.points.map((p) => (
                    <Box key={p} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>{p}</Typography>
                    </Box>
                  ))}
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => nav('/login')}
                    sx={{ mt: 3, py: 1.5, fontWeight: 700, borderRadius: 2, background: `linear-gradient(135deg, ${r.color}, ${r.color}99)`, '&:hover': { transform: 'translateY(-2px)' }, transition: 'all 0.3s' }}
                  >
                    Get Started as {r.title.split(' ')[1]}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CTA Section */}
      <Box sx={{ textAlign: 'center', py: 12, px: 3, position: 'relative', mx: { xs: 2, md: 8 }, mb: 6, borderRadius: 4, background: 'linear-gradient(135deg, rgba(102,126,234,0.12) 0%, rgba(240,147,251,0.12) 100%)', border: '1px solid rgba(102,126,234,0.2)' }}>
        <Box sx={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(102,126,234,0.2) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, position: 'relative' }}>Ready to Get Started?</Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.55)', mb: 4, position: 'relative' }}>
          Join LearnTrack and take control of your academic journey.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => nav('/login')}
          sx={{ px: 6, py: 2, fontWeight: 700, fontSize: '1rem', borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 8px 32px rgba(102,126,234,0.4)', position: 'relative', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 40px rgba(102,126,234,0.6)' }, transition: 'all 0.3s' }}
        >
          Sign In Now →
        </Button>
      </Box>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', py: 3, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>© 2026 LearnTrack. Built for academic excellence.</Typography>
      </Box>
    </Box>
  )
}
