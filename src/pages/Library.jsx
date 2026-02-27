import React, { useState } from 'react'
import { Container, Typography, Grid, Card, CardContent, Button, Box, Chip } from '@mui/material'

export default function Library() {
  const [borrowed, setBorrowed] = useState([])
  
  const books = [
    { id: 1, title: 'Full Stack Development', author: 'David Flanagan', available: true },
    { id: 2, title: 'Machine Learning Basics', author: 'Andrew Ng', available: false },
    { id: 3, title: 'NLP with Python', author: 'Steven Bird', available: true },
    { id: 4, title: 'Operating Systems', author: 'Abraham Silberschatz', available: true }
  ]

  const handleBorrow = (bookId) => {
    if (!borrowed.includes(bookId)) {
      setBorrowed([...borrowed, bookId])
    }
  }

  const handleReturn = (bookId) => {
    setBorrowed(borrowed.filter(id => id !== bookId))
  }

  return (
    <Container sx={{ mt: 0 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Library</Typography>
      
      {borrowed.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>My Borrowed Books</Typography>
          <Grid container spacing={2}>
            {borrowed.map(bookId => {
              const book = books.find(b => b.id === bookId)
              return (
                <Grid item xs={12} md={6} key={bookId}>
                  <Card sx={{ bgcolor: '#e3f2fd' }}>
                    <CardContent>
                      <Typography variant="h6">{book.title}</Typography>
                      <Typography variant="body2" color="text.secondary">by {book.author}</Typography>
                      <Box sx={{ mt: 2 }}>
                        <Button variant="outlined" size="small" onClick={() => handleReturn(bookId)}>Return</Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      )}
      
      <Typography variant="h6" sx={{ mb: 2 }}>Available Books</Typography>
      <Grid container spacing={3}>
        {books.map(book => {
          const isBorrowed = borrowed.includes(book.id)
          const isAvailable = book.available && !isBorrowed
          
          return (
            <Grid item xs={12} md={6} key={book.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Typography variant="h6">{book.title}</Typography>
                    {isBorrowed && <Chip label="Borrowed" color="success" size="small" />}
                  </Box>
                  <Typography variant="body2" color="text.secondary">by {book.author}</Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button 
                      variant={isAvailable ? 'contained' : 'outlined'} 
                      disabled={!isAvailable}
                      size="small"
                      onClick={() => handleBorrow(book.id)}
                    >
                      {isBorrowed ? 'Already Borrowed' : isAvailable ? 'Borrow' : 'Not Available'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
