import React, { useEffect, useState } from 'react'
import { Modal, Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const CourseDetails = ({ open, handleClose, course }) => {
    console.log(course);
    const organizationalUnit = [
        {
          id: 0,
          value: 'Academic'
        },
        {
          id: 1,
          value: 'Corporate'
        },
        {
          id: 2,
          value: 'Retail'
        },
        {
          id: 3,
          value: 'Government'
        }
      ]
  
      const trainingType = [
        {
          id: 0,
          value: 'LTT [6 months]'
        },
        {
          id: 1,
          value: 'MDT [2 months]'
        },
        {
          id: 2,
          value: 'Microskill [1 month]'
        }
      ]
  
      const status = [
        {
          id: 0,
          value: 'Upcoming'
        },
        {
          id: 1,
          value: 'Ongoing'
        },
        {
          id: 2,
          value: 'Completed'
        },
        {
          id: 3,
          value: 'Cancelled'
        },
        {
          id: 4,
          value: 'Hold'
        }
      ]

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Course Details
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {course ? (
                <>
                    <div>ID: <b>{course.id}</b></div>
                    <div>Course Name: <b>{course.course_name}</b></div>
                    <div>Start Date: <b>{dayjs(course.start_date).format('DD/MMM/YYYY')}</b></div>
                    <div>End Date: <b>{dayjs(course.end_date).format('DD/MMM/YYYY')}</b></div>
                    <div>Feedback Score: <b>{course.feedback_score}</b></div>
                    <div>Organization Unit: <b>{organizationalUnit.find(org => org.id === course.organization_unit).value}</b></div>
                    <div>Status: <b>{status.find(org => org.id === course.status).value}</b></div>
                    <div>Training Type: <b>{trainingType.find(org => org.id === course.training_type).value}</b></div>
                    <div>Batch Count: <b>{course.batch_count}</b></div>
                    <div>Trainer: <b>{course.trainer_name}</b></div>
                </>
                ) : (
                <div>Loading...</div>
                )}
            </Typography>
            <Button onClick={handleClose}>Close</Button>
            </Box>
        </Modal>
    )
}

export default CourseDetails;