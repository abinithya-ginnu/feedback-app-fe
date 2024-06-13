import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { styled, Alert } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import './AddCourse.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    maxWidth: '800px',
    borderRadius: '10px'
  },
  '& .MuiDialogTitle-root' : {
    backgroundColor: '#3F206D '
  },
  '& .MuiFormLabel-root, & .MuiInputBase-inputMultiline': {
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
  }
}));

const AddCourse = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [alert, setAlert] = useState("");

    const [input, setInput] = useState({
      course_name: '',
      organizational_unit: 0,
      training_type: 0,
      start_date: new Date(),
      end_date: new Date(),
      batch_count: 0,
      status: 0,
      feedback_score: '',
      description: '',
      user_id: sessionStorage.getItem("id"),
      trainer: sessionStorage.getItem("id")
    });

    const [isCourseNameValid, setIsCourseNameValid] = useState(true);
    const [isBatchCountValid, setIsBatchCountValid] = useState(true);

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

    const inputHandler= (event)=> {
      setInput({...input,[event.target.name]:event.target.value});
      if(event.target.name === "course_name"){
        if(event.target.value === ""){
          setIsCourseNameValid(false);
        } else {
          setIsCourseNameValid(true);
        }
      }
      if(event.target.name === "batch_count"){
        if(event.target.value === ""){
          setIsBatchCountValid(false);
        } else {
          setIsBatchCountValid(true);
        }
      }
    }

    const startDateHandler = (event) => {
      if (event.$isDayjsObject) {
        console.log(new Date(event.$d));
        setInput({...input,['start_date']:new Date(event.$d)});
      }
    }
    const endDateHandler = (event) => {
      if (event.$isDayjsObject) {
        console.log(new Date(event.$d));
        setInput({...input,['end_date']:new Date(event.$d)});
      }
    }

    const [headers, setHeaders] = useState(
      {
        "Authorization" : "Bearer " + sessionStorage.getItem("token")
      }
    )
    const addCourse = (e) =>{
      console.log(input);
      e.preventDefault();
      if(input.course_name === ""){
        input.course_name === "" && setIsCourseNameValid(false);
      } else {
          axios.post(process.env.REACT_APP_BASE_URL + "/course/save",input,{headers:headers}).then(
            (response)=>{
              if(response.status === 201){
                setAlert("Course added successfully!");
                setTimeout(() => {
                  setAlert("");
                  setInput({
                    course_name: '',
                    organizational_unit: 0,
                    start_date: new Date(),
                    end_date: new Date(),
                    batch_count: '',
                    status: 0,
                    feedback_score: '',
                    description: '',
                    user_id: sessionStorage.getItem("id"),
                    trainer: sessionStorage.getItem("id")
                  });
                }, 3000);
                props.refresh();
              }
            }
          ).catch((err)=> {
            setAlert("Something went wrong!");
            setTimeout(() => {
              setAlert("");
            }, 3000);
          })
        }  
    }

   
    return (
      <div className='add-course-modal'>
        <a className="nav-link" href="#">
            <button onClick={handleOpen} className='btn btn-primary fb-btn-primary'>Add Course</button>
        </a>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            
          }}
        >
            <React.Fragment> 
            <Box sx={style}>
              <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              >
                <DialogTitle 
                sx={{ m: 0, p: 2, 
                  backgroundColor: "#014f86",
                  color: 'white',
                  fontSize: 'medium',
                  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
                }} 
                id="customized-dialog-title">
                  Add New Course
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon/>
                </IconButton>
                <DialogContent sx={{fontSize:'small'}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={3} sm={4} md={4}>
                      <TextField
                      error = {!isCourseNameValid}
                      label="Name of the course"
                      required
                      fullWidth
                      size="medium"
                      id="course_name"
                      name='course_name'
                      type='text'
                      value={input.course_name}
                      onChange={inputHandler}
                      sx={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                      />
                  </Grid>
                  <Grid item xs={3} sm={4} md={4}>
                    <TextField
                    label="Organizational Unit"
                    fullWidth
                    required
                    size="medium"
                    id="organizational_unit"
                    name='organizational_unit'
                    type='text'
                    value={input.organizational_unit}
                    onChange={inputHandler}
                    select
                    SelectProps={{
                      native:'true'
                    }}
                    >
                      {organizationalUnit.map((ou) => (
                      <option key={ou.id} value={ou.id}>
                        {ou.value}
                      </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={3} sm={4} md={4}>
                    <TextField
                    id="training_type"
                    label="Training Type"
                    fullWidth
                    required
                    type='text'
                    size="medium"
                    name='training_type'
                    value={input.training_type}
                    onChange={inputHandler}
                    select
                    SelectProps={{
                      native:'true'
                    }}
                    >
                      {trainingType.map((tt) => (
                      <option key={tt.id} value={tt.id}>
                        {tt.value}
                      </option>
                      ))}
                    </TextField> 
                  </Grid>
                  <Grid item xs={3} sm={4} md={4}>
                    <TextField
                    id="status"
                    label="Status of course"
                    fullWidth
                    required
                    type='number'
                    size="medium"
                    name='status'
                    value={input.status}
                    onChange={inputHandler}
                    select
                    SelectProps={{
                      native:'true'
                    }}
                    >
                      {status.map((prof) => (
                      <option key={prof.id} value={prof.id}>
                        {prof.value}
                      </option>
                      ))}
                    </TextField> 
                  </Grid>
                  <Grid item xs={3} sm={4} md={4}>
                  <LocalizationProvider required dateAdapter={AdapterDayjs}>
                      <DatePicker className='course-date'
                        label="Start Date"
                        fullWidth
                        required
                        name='start_date' 
                        size='medium'
                        value={dayjs(input.start_date)}
                        onChange={startDateHandler}
                        format="YYYY-MM-DD"
                        disablePast
                        openTo="day"
                        views={["year", "month", "day"]} 
                      />
                  </LocalizationProvider>
                  </Grid>
                  <Grid item xs={3} sm={4} md={4}>
                  <LocalizationProvider required dateAdapter={AdapterDayjs}>
                      <DatePicker className='course-date'
                        label="End Date"
                        fullWidth
                        required
                        name='end_date'
                        size='medium'
                        value={dayjs(input.end_date)}
                        onChange={endDateHandler}
                        format="YYYY-MM-DD"
                        disablePast
                        openTo="day"
                        views={["year", "month", "day"]} 
                      />
                  </LocalizationProvider>
                  </Grid> 
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                    label="Description"
                    fullWidth
                    name='description'
                    multiline
                    rows={2}
                    id="description"
                    value={input.description}
                    onChange={inputHandler}
                    placeholder="Type Here..."
                    sx={{fontSize:'50px'}}
                    />
                  </Grid>
                </Grid>
                
                <DialogActions>
                  {alert.includes('success') &&
                    <Alert sx={{ padding: '0px 16px' }} variant="outlined" severity="success">
                    {alert}
                  </Alert>}
                  {alert && !alert.includes('success') &&
                  <Alert sx={{ padding: '0px 16px' }} variant="outlined" severity="error">
                    {alert}
                  </Alert>}
                   <Button autoFocus variant="contained" size='medium' type='submit' style={{backgroundColor: "#3F206D"}} onClick={addCourse}>
                    Add
                   </Button>
                </DialogActions>
                </DialogContent>
              </BootstrapDialog>
              </Box>
            </React.Fragment>
        </Modal>
      </div>
    );
}

export default AddCourse
