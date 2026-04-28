const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8082/api'

const h = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('lt_token')}`
})

const req = async (url, options = {}) => {
  const res = await fetch(`${BASE}${url}`, { ...options, headers: h() })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export const api = {
  login: (data) => fetch(`${BASE}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json()),
  getMe: () => req('/users/me'),
  updateMe: (data) => req('/users/me', { method: 'PUT', body: JSON.stringify(data) }),
  getStudents: () => req('/users/students'),
  getCourses: () => req('/courses'),
  addCourse: (data) => req('/courses', { method: 'POST', body: JSON.stringify(data) }),
  updateCourse: (id, data) => req(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCourse: (id) => req(`/courses/${id}`, { method: 'DELETE' }),
  getAssessments: () => req('/assessments'),
  addAssessment: (data) => req('/assessments', { method: 'POST', body: JSON.stringify(data) }),
  updateAssessment: (id, data) => req(`/assessments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAssessment: (id) => req(`/assessments/${id}`, { method: 'DELETE' }),
  getHomework: () => req('/homework'),
  addHomework: (data) => req('/homework', { method: 'POST', body: JSON.stringify(data) }),
  updateHomework: (id, data) => req(`/homework/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteHomework: (id) => req(`/homework/${id}`, { method: 'DELETE' }),
  submitHomework: (id, data) => req(`/homework/${id}/submit`, { method: 'POST', body: JSON.stringify(data) }),
  gradeHomework: (id, data) => req(`/homework/${id}/grade`, { method: 'POST', body: JSON.stringify(data) }),
  getAnnouncements: () => req('/announcements'),
  addAnnouncement: (data) => req('/announcements', { method: 'POST', body: JSON.stringify(data) }),
  updateAnnouncement: (id, data) => req(`/announcements/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAnnouncement: (id) => req(`/announcements/${id}`, { method: 'DELETE' }),
  getCalendar: () => req('/calendar'),
  addCalendarEvent: (data) => req('/calendar', { method: 'POST', body: JSON.stringify(data) }),
  updateCalendarEvent: (id, data) => req(`/calendar/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCalendarEvent: (id) => req(`/calendar/${id}`, { method: 'DELETE' }),
  getSchedule: () => req('/schedule'),
  addSchedule: (data) => req('/schedule', { method: 'POST', body: JSON.stringify(data) }),
  updateSchedule: (id, data) => req(`/schedule/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteSchedule: (id) => req(`/schedule/${id}`, { method: 'DELETE' }),
  getAttendance: () => req('/attendance'),
  addAttendance: (data) => req('/attendance', { method: 'POST', body: JSON.stringify(data) }),
  updateAttendance: (id, data) => req(`/attendance/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
}
