import { Box, Grid, TextField, Button, styled, Paper, createTheme, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import './SignUp.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 500,
  padding: '20px 50px 20px 50px',
  lineHeight: '70px',
  borderRadius: '8px',
  '& .css-k69abp-MuiResponsiveChart-container': {
    paddingLeft: '50px'
  },
  '& .MuiFormControl-root': {
    marginTop: '16px'
  },
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const SignUp = () => {
  const[isNameValid, setIsNameValid] = useState(true);
  const[isEmailValid, setIsEmailValid] = useState(true);
  const[isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailFormatValid, setIsEmailFormatValid] = useState(true);
  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(true);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();

  const[input, setInput] = new useState(
    {
      name: "",
      email: "",
      password: "",
      profession: 0
    }
  )

  const professions = [
    {
      id: 0,
      value: 'Participant'
    },
    {
      id: 1,
      value: 'IQA'
    },
    {
      id: 2,
      value: 'Trainer'
    }
  ]

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const inputHandler= (event) => {
    setInput({...input,[event.target.name]:event.target.value});
    if (event.target.name == "name"){
      if (event.target.value == ""){
        setIsNameValid(false);
      } else {
        setIsNameValid(true);
      }
    }
    if (event.target.name == "email"){
      if (event.target.value == ""){
        setIsEmailValid(false);
        setIsEmailFormatValid(false);
      } else {
        if (validateEmail(event.target.value)){
          setIsEmailFormatValid(true);
          axios.get("http://localhost:8080/emailexists?email=" + event.target.value).then(
            (response) => {
              if(response.data.code === 200) {
                setIsEmailExist(true);
                setIsEmailValid(false);
              } else if (response.data.code === 404) {
                setIsEmailExist(false);
                setIsEmailValid(true);
              } else {
                setIsEmailExist(false);
                setIsEmailValid(false);
              }
            }
          );
        } else {
          setIsEmailValid(false);
          setIsEmailFormatValid(false);
        }    
      }
    }
    if (event.target.name == "password") {
      if (event.target.value == "") {
        setIsPasswordValid(false);
      } else {
        if ((event.target.value.length) >= 8){
          setIsPasswordValid(true);
          setIsPasswordLengthValid(true);
        } else {
          setIsPasswordLengthValid(false);
          setIsPasswordValid(false);
        }
      }
    }
  }

  const handleRegister = (e) => {
    e.preventDefault();
    if(input.name === "" || input.email === "" || input.password === "" ) {
      input.name === "" && setIsNameValid(false);
      input.email === "" && setIsEmailValid(false);
      input.password === "" && setIsPasswordValid(false);
      
    } else {
      if (isNameValid && isEmailValid && !isEmailExist && isPasswordValid){
          axios.post("http://localhost:8080/signup",input).then(
            (response)=>{
                console.log(response.data);
                if (response.data.status === "success"){
                  sessionStorage.setItem("id", response.data.id);
                  sessionStorage.setItem("token", response.data.token);
                  sessionStorage.setItem("name", response.data.name);
                  sessionStorage.setItem("profession", response.data.profession);
                  if(response.data.profession === 'PARTICIPANT') {
                    navigate("/participant-dashboard");
                  } else if (response.data.profession === 'IQA') {
                    navigate("/admin-dashboard");
                  } else if (response.data.profession === 'TRAINER') {
                    navigate("/trainer-dashboard");
                  }
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
    }
  };
  

  return (
    <div className='fb-sign-up'>
      <Grid className='signup-container' container component="main">
        <Grid item xs={12} sm={8} md={6}>
        <ThemeProvider theme={lightTheme}>
            <Box
                sx={{
                mx: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
                }}
            >
              <Item key={1} elevation={1}>
                <h3 style={{ textAlign: 'left', color: '#1A0D2D'}}>Welcome!</h3>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField 
                    error={!isNameValid}
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value = {input.name}
                    onChange={inputHandler}
                    />
                    <TextField
                    error={!isEmailValid}
                    className='email-field'
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="E-mail Id"
                    id="email"
                    autoComplete="email"
                    value = {input.email} 
                    onChange={inputHandler}  
                    helperText = {isEmailFormatValid ? (isEmailExist ? "Email already exists." : "") : "Please enter a valid email-id."}
                    />
                    <TextField
                    error={!isPasswordValid}
                    type='password'
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    autoComplete="password"
                    value = {input.password}
                    onChange={inputHandler}
                    helperText = {isPasswordLengthValid ? "" : "Password must have atleast 8 characters."}
                    />
                    <TextField
                    label="I am a"
                    fullWidth
                    required
                    size="medium"
                    id="profession"
                    name='profession'
                    value={input.profession}
                    onChange={inputHandler}
                    select
                    SelectProps={{
                      native:'true'
                    }}
                    >
                      {professions.map((prof) => (
                      <option key={prof.id} value={prof.id}>
                        {prof.value}
                      </option>
                      ))}
                    </TextField>
                    <Button className='register-btn'
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1, mb: 2}}
                      onClick={handleRegister}
                    >
                      Register
                    </Button>
                    <div className='login'>
                      <h5>Already have an account? <a href="/">Login</a></h5>
                    </div>
                </Box>
              </Item>
            </Box>
          </ThemeProvider>    
        </Grid>
      </Grid>
    </div>
  )
}

export default SignUp
