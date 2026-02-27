import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Box, Container } from '@mui/material'

export default function Layout({ role = 'teacher' }) {
  const navItems = role === 'teacher'
    ? [
        { path: '/teacher', label: 'Overview' },
        { path: '/teacher/assessments', label: 'Assessments' },
        { path: '/teacher/reports', label: 'Reports' },
        { path: '/teacher/attendance', label: 'Attendance' },
        { path: '/teacher/grades', label: 'Grades' },
        { path: '/teacher/courses', label: 'Courses' },
        { path: '/teacher/schedule', label: 'Schedule' },
        { path: '/teacher/homework', label: 'Homework' },
        { path: '/teacher/announcements', label: 'Announcements' },
        { path: '/teacher/calendar', label: 'Calendar' },
        { path: '/teacher/library', label: 'Library' },
        { path: '/teacher/profile', label: 'Profile' },
        { path: '/teacher/settings', label: 'Settings' }
      ]
    : [
        { path: '/student', label: 'Overview' },
        { path: '/student/assessments', label: 'Assessments' },
        { path: '/student/reports', label: 'Reports' },
        { path: '/student/grades', label: 'Grades' },
        { path: '/student/courses', label: 'Courses' },
        { path: '/student/schedule', label: 'Schedule' },
        { path: '/student/homework', label: 'Homework' },
        { path: '/student/announcements', label: 'Announcements' },
        { path: '/student/calendar', label: 'Calendar' },
        { path: '/student/library', label: 'Library' },
        { path: '/student/profile', label: 'Profile' },
        { path: '/student/settings', label: 'Settings' }
      ]

  return (
    <Box>
      <Navbar />
      <Sidebar items={navItems} />
      <Container className="lt-main" sx={{ marginLeft: '240px', paddingTop: '88px' }}>
        <Outlet />
      </Container>
    </Box>
  )
}
