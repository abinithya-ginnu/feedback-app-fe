import { Box, Grid, Paper, TextField, ThemeProvider, createTheme, styled } from '@mui/material';
import React from 'react'
import './FeedbackForm.css'
import PropTypes from 'prop-types';
//import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';


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
                        <Grid className='feedback-qn'>
                            <b><p>The training course was relevant and helpful for me to relate.</p></b>
                            <StyledRating className='fb-icons'
                                name="highlight-selected-only"
                                defaultValue={2}
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
                                name="highlight-selected-only"
                                defaultValue={2}
                                IconContainerComponent={IconContainer}
                                getLabelText={(value) => customIcons[value].label}
                                highlightSelectedOnly
                            />
                        </Grid>
                        <Grid className='feedback-qn'>
                            <b><p>I am confident in applying the learnings into practice.</p></b>
                            <StyledRating className='fb-icons'
                                name="highlight-selected-only"
                                defaultValue={2}
                                IconContainerComponent={IconContainer}
                                getLabelText={(value) => customIcons[value].label}
                                highlightSelectedOnly
                            />
                        </Grid>
                        <Grid className='feedback-qn'>
                            <b><p>How would you rate the trainer?</p></b>
                            <StyledRating className='fb-icons'
                                name="highlight-selected-only"
                                defaultValue={2}
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
                          name='description'
                          color='secondary'
                          multiline
                          rows={4}
                          id="description"
                          placeholder="Type Here..."
                          sx={{fontSize:'50px'}}
                          />
                        </Grid>
                        <Grid className='feedback-qn'>
                          <b><p style={{ marginBottom: '0'}}>Any additional comments/suggestions.</p></b>
                          <TextField
                          fullWidth
                          style={{ marginTop: '0'}}
                          name='description'
                          color='secondary'
                          multiline
                          rows={4}
                          id="description"
                          placeholder="Type Here..."
                          sx={{fontSize:'50px'}}
                          />
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
