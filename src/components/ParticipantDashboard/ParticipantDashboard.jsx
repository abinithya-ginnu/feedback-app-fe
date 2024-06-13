import React from 'react'
import LoginNavbar from '../LoginNavBar/LoginNavbar'
import { Paper } from '@mui/material'
import FeedbackForm from '../FeedbackForm/FeedbackForm'

const Dashboard = () => {
  return (
    <div>
      <LoginNavbar profession="PARTICIPANT" />
      <FeedbackForm />
    </div>
  )
}

export default Dashboard
