import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api/api'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lt_user')) || null } catch { return null }
  })
  const [assessments, setAssessments] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      api.getAssessments().then(data => {
        // normalize scores to match frontend format {studentId, score}
        const normalized = data.map(a => ({
          ...a,
          scores: (a.scores || []).map(s => ({
            studentId: s.student?.id || s.studentId,
            score: s.score
          }))
        }))
        setAssessments(normalized)
      }).catch(() => {})
      api.getStudents().then(data => {
        setStudents(data.map(s => ({ id: s.id, name: s.name, major: s.major || 'Computer Science' })))
      }).catch(() => {})
    }
  }, [user])

  async function login(username, password) {
    try {
      const data = await api.login({ username, password })
      if (data.token) {
        localStorage.setItem('lt_token', data.token)
        localStorage.setItem('lt_user', JSON.stringify(data.user))
        setUser(data.user)
        return { ok: true, user: data.user }
      }
      return { ok: false }
    } catch {
      return { ok: false }
    }
  }

  function logout() {
    setUser(null)
    setAssessments([])
    localStorage.removeItem('lt_user')
    localStorage.removeItem('lt_token')
  }

  async function updateUser(updates) {
    try {
      const updated = await api.updateMe(updates)
      const newUser = { ...user, ...updated }
      setUser(newUser)
      localStorage.setItem('lt_user', JSON.stringify(newUser))
    } catch {
      const newUser = { ...user, ...updates }
      setUser(newUser)
      localStorage.setItem('lt_user', JSON.stringify(newUser))
    }
  }

  async function addAssessment(assessment) {
    const saved = await api.addAssessment(assessment)
    setAssessments(s => [...s, saved])
  }

  async function updateAssessment(id, update) {
    const saved = await api.updateAssessment(id, update)
    setAssessments(s => s.map(a => a.id === id ? saved : a))
  }

  async function deleteAssessment(id) {
    await api.deleteAssessment(id)
    setAssessments(s => s.filter(a => a.id !== id))
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, assessments, addAssessment, updateAssessment, deleteAssessment, students, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
