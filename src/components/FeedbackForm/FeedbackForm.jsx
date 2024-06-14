import { Box, Button, Grid, Paper, TextField, ThemeProvider, createTheme, styled, Snackbar } from '@mui/material';
import React, { useState } from 'react'
import './FeedbackForm.css'
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    padding: '20px 50px 20px 50px',
    lineHeight: '70px',
    borderRadius: '8px',
    '& .css-k69abp-MuiResponsiveChart-container': {
      paddingLeft: '50px'
    },
    '& .MuiFormControl-root': {
      marginTop: '16px'
    }
  }));


  const lightTheme = createTheme({ palette: { mode: 'light' } });

  const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
      color: theme.palette.action.disabled,
    },
  }));

  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon color="error" />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon color="error" />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon color="warning" />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon color="success" />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon color="success" />,
      label: 'Very Satisfied',
    },
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other} title={customIcons[value].label}>{customIcons[value].icon}</span>;
  }
  
  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

const FeedbackForm = () => {

  const [input, setInput] = new useState(
    {
      q1: 5,
      q2: 5,
      q3: 5,
      q4: 5,
      q5: "",
      q6: "",
      user_id: sessionStorage.getItem("id"),
      course_id: 1
    }
  );
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;

  const inputHandler = (event) => {
    if(event.target.name === 'q5' || event.target.name === 'q6') {
      setInput({...input,[event.target.name]:event.target.value});
    } else {
      setInput({...input,[event.target.name]:event.target._wrapperState.initialValue});
    }
  }

  const navigate = useNavigate();
  const [alert, setAlert] = useState("");
  const [headers, setHeaders] = useState(
    {
      "Authorization" : "Bearer " + sessionStorage.getItem("token")
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_BASE_URL + "/feedback/save",input,{headers:headers}).then(
      (response)=>{
          if (response.data.status === "success"){
            setState({ ...state, open: true });
            setTimeout(() => {
              setState({ ...state, open: false });
              window.location.href = "https://ictkerala.org/";
            }, 3000);
          } else {
            setAlert("Failed to save feedback!");
            setTimeout(() => {
              setAlert("");
            }, 3000);
          } 
      }
    ).catch((err)=> {
      console.log(err);
      setAlert(err.message);
            setTimeout(() => {
              setAlert("");
            }, 3000);
    })
  }

  return (
    <div className='feedback-main'>
        <Grid container component="main" className='feedback-container'>
            <Grid item xs={12} sm={8} md={6}>
            <ThemeProvider theme={lightTheme}>
                <Box
                sx={{
                my: 4,
                mx: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start'
                }}
                >
                    <Item key={1} elevation={1}>
                        <Snackbar
                          anchorOrigin={{ vertical, horizontal }}
                          open={open}
                          autoHideDuration={5000}
                          message="Thank you for your valuable feedback."
                          key={ vertical + horizontal }
                        />
                        <h3>FSD Java Course - Feedback</h3>
                        <Grid className='feedback-qn'>
                            <b><p>The training course was relevant and helpful for me to relate.</p></b>
                            <StyledRating className='fb-icons'
                                name="q1"
                                defaultValue={input.q1}
                                onChange={inputHandler}
                                IconContainerComponent={IconContainer}
                                getLabelText={(value) => customIcons[value].label}
                                highlightSelectedOnly
                                title={(value) => customIcons[value].label}
                                size='large'
                            />
                        </Grid>
                        <Grid className='feedback-qn'>
                            <b><p>Delivery of the content was clear and understandable.</p></b>
                            <StyledRating className='fb-icons'
                                name="q2"
                                defaultValue={input.q2}
                                onChange={inputHandler}
                                IconContainerComponent={IconContainer}
                                getLabelText={(value) => customIcons[value].label}
                                highlightSelectedOnly
                            />
                        </Grid>
                        <Grid className='feedback-qn'>
                            <b><p>I am confident in applying the learnings into practice.</p></b>
                            <StyledRating className='fb-icons'
                                name="q3"
                                defaultValue={input.q3}
                                onChange={inputHandler}
                                IconContainerComponent={IconContainer}
                                getLabelText={(value) => customIcons[value].label}
                                highlightSelectedOnly
                            />
                        </Grid>
                        <Grid className='feedback-qn'>
                            <b><p>How would you rate the trainer?</p></b>
                            <StyledRating className='fb-icons'
                                name="q4"
                                defaultValue={input.q4}
                                onChange={inputHandler}
                                IconContainerComponent={IconContainer}
                                getLabelText={(value) => customIcons[value].label}
                                highlightSelectedOnly
                            />
                        </Grid>
                        <Grid className='feedback-qn'>
                          <b><p style={{ marginBottom: '0'}}>What did you enjoy the most about the training session?</p></b>
                          <TextField
                          fullWidth
                          style={{ marginTop: '0'}}
                          name='q5'
                          color='secondary'
                          multiline
                          rows={4}
                          id="description"
                          placeholder="Type Here..."
                          sx={{fontSize:'50px'}}
                          value={input.q5}
                          onChange={inputHandler}
                          />
                        </Grid>
                        <Grid className='feedback-qn'>
                          <b><p style={{ marginBottom: '0'}}>Any additional comments/suggestions.</p></b>
                          <TextField
                          fullWidth
                          style={{ marginTop: '0'}}
                          name='q6'
                          color='secondary'
                          multiline
                          rows={4}
                          id="description"
                          placeholder="Type Here..."
                          sx={{fontSize:'50px'}}
                          value={input.q6}
                          onChange={inputHandler}
                          />
                        </Grid>
                        <Grid>
                        <Button className='submit-button'
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2, backgroundColor: "#014f86"}}
                        onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                        </Grid>
                    </Item>
                </Box>
            </ThemeProvider>
            </Grid>
        </Grid>
    </div>
  )
}

export default FeedbackForm
