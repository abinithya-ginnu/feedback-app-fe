import React, { useEffect, useState } from 'react'
import LoginNavbar from '../LoginNavBar/LoginNavbar'
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { Delete, Edit, Update } from '@mui/icons-material';
import AddCourse from '../AddCourse/AddCourse';

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

const TrainerDashboard = () => {

  const [courses, setCourses] = useState([]);

  const [headers, setHeaders] = useState(
      {
        "Authorization" : "Bearer " + sessionStorage.getItem("token")
      }
    )

  const refresh = () => {
    fetchData();
  }

  const fetchData = () =>{
      axios.get(process.env.REACT_APP_BASE_URL + '/course/get?trainerId=' + sessionStorage.getItem("id"), {headers: headers})
      .then(response => {
          if(response.data.code === 200) {
              setCourses(response.data.courses);
          }
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
  }

  const deleteCourse = React.useCallback(
      (id) => () => {
          setTimeout(() => {
              axios.delete(process.env.REACT_APP_BASE_URL + '/course/delete?id=' + id, {headers: headers})
              .then(response => {
                  if(response.data.code === 200) {
                      setCourses((prevRows) => prevRows.filter((row) => row.id !== id));
                  }
              })
              .catch(error => {
                  console.error('Error deleting course:', error);
              });
          });
  },[],);

  useEffect(() => {
      fetchData();
  }, []);

  const courseColumns = [
      { field: 'course_name', headerName: 'Name', width: 250 },
      { field: 'start_date', headerName: 'Start Date', type: 'date', width: 150, valueFormatter: (value) => dayjs(value).format('DD/MM/YYYY') },
      { field: 'end_date', headerName: 'End Date', type: 'date', width: 150, valueFormatter: (value) => dayjs(value).format('DD/MM/YYYY') },
      { field: 'feedback_score', headerName: 'Feedback Score', sortable: false, width: 150 },
      { field: 'training_type', headerName: 'Duration', width: 150, valueFormatter: (value) => value.indexOf('LTT') != -1 ? `6 months` : (value.indexOf('MDT') != -1 ? `2 months` : value.indexOf('Micro') != -1 && `1 month`) },
      { field: 'description', headerName: 'Description', sortable: false, width: 300 },
      { field: 'actions', type: 'actions', width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<Edit />}
            label="Update"
            onClick={<AddCourse />}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={deleteCourse(params.id)}
            showInMenu
          />
        ]
      }
  ];

  return (
    <div>
      <LoginNavbar profession="TRAINER" refresh={refresh}/>
      <div className="container mt-3"> 
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
  )
}

export default TrainerDashboard
