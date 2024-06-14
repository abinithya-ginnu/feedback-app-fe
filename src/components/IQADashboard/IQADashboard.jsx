import React, { useCallback, useEffect, useState } from 'react'
import LoginNavbar from '../LoginNavBar/LoginNavbar'
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box, Grid, Link, Paper } from '@mui/material';
import axios from 'axios';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { Delete, Edit, Update } from '@mui/icons-material';
import './IQADashboard.css';
import CourseDetails from '../CourseDetails/CourseDetails';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 666,
  overflow: 'auto',
  lineHeight: '60px',
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  '& .MuiTypography-root, .MuiDataGrid-cell': {
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
  },
  '& .MuiDataGrid-columnHeaderTitle': {
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      fontWeight: 600,
      fontSize: 'medium',
      color: '#3F206D'
  },
  '& .MuiListItemText-root': {
      paddingLeft: '10px'
  },
  '& .MuiLinearProgress-root': {
      width: '100%',
      height: '10px',
      borderRadius: 5
  },
  '& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
      marginBottom: '0px'
  },
  '& .MuiDataGrid-toolbarContainer': {
      justifyContent: 'flex-end',
      '& button': {
          color: '#3F206D',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
      }
  }
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const customToolBar = () => {
  return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
  );
}

const IQADashboard = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleOpen = (course) => {
    fetchCourseDetails(course);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null);
  };

  const fetchCourseDetails = (course) =>{
    axios.get(process.env.REACT_APP_BASE_URL + '/course/get/'+ course.id, {headers: headers})
    .then(response => {
        if(response.data.code === 200) {
          setSelectedCourse(response.data.details);
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }

  const [headers, setHeaders] = useState(
      {
        "Authorization" : "Bearer " + sessionStorage.getItem("token")
      }
    )

  const fetchData = () =>{
      axios.get(process.env.REACT_APP_BASE_URL + '/course/get/iqa', {headers: headers})
      .then(response => {
          if(response.data.code === 200) {
              setCourses(response.data.courses);
          }
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
      fetchData();
  }, []);

  const courseColumns = [
      { field: 'course_name', headerName: 'Course Name', width: 250 },
      { field: 'feedback_score', headerName: 'Feedback Score', sortable: false, width: 200 },
      { field: 'trainer', headerName: 'Trainer', sortable: false, width: 200 },
      { field: 'action', headerName: '', sortable: false, width: 300,
        renderCell: (params) => (
          <Link
            component="button"
            variant="body2"
            onClick={() => handleOpen(params.row)}
          >
            See More
          </Link>
        )
       },
  ];

  return (
    <div>
      <LoginNavbar profession="IQA" />
      <div className="iqa-dashboard">
        <div className="container iqa-container"> 
          <ThemeProvider theme={lightTheme}>
            <Box
            sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default',
                display: 'grid',
            }}
            >
              <Item key={1} elevation={1}> 
                <Grid xs={12} md={12} sm={12} xl={12}>
                  <div style={{ height: 666, width: '100%' }}>
                      {courses.length > 0 &&
                          <DataGrid
                              rows={courses}
                              columns={courseColumns}
                              getRowId={(row) => row.id}
                              initialState={{
                                  pagination: {
                                      paginationModel: { page: 0, pageSize: 10 },
                                  },
                              }}
                              pageSizeOptions={[5, 10]}
                              slots={{
                                  toolbar: customToolBar,
                              }}
                      />}
                      <CourseDetails open={open} handleClose={handleClose} course={selectedCourse} />
                      {courses.length === 0 &&
                          <p fontFamily="-apple-system, BlinkMacSystemFont, sans-serif">No data available to display</p>
                      }
                  </div>
                </Grid>
              </Item>
            </Box>
          </ThemeProvider>   
        </div>
      </div>
    </div>
  )
}

export default IQADashboard
