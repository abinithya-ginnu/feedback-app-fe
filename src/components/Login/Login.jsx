import { Alert, Box, Button, Grid, Paper, TextField, ThemeProvider, createTheme, styled } from '@mui/material'
import React, { useState } from 'react'
import './Login.css'
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
  }
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const Login = () => {

  const [isEmailFormatValid, setIsEmailFormatValid] = useState(true);
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");

  const[input, setInput] = new useState(
    {
      email: "",
      password: "",
    }
  )

  const inputHandler= (event)=> {
    setInput({...input,[event.target.name]:event.target.value});
    if(event.target.name === "email"){
      if(validateEmail(event.target.value)){
        setIsEmailFormatValid (true);
      } else {
        setIsEmailFormatValid(false);
      }
    }  
  }
      
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/login",input).then(
      (response)=>{
          if (response.data.status === "success"){
            sessionStorage.setItem("id", response.data.id);
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("name", response.data.name);
            sessionStorage.setItem("profession", response.data.profession);
            if(response.data.profession === 'PARTICIPANT') {
              navigate("/participant-dashboard");
            } else if (response.data.profession === 'IQA') {
              navigate("/iqa-dashboard");
            } else if (response.data.profession === 'TRAINER') {
              navigate("/trainer-dashboard");
            }
          } else {
            setAlert("Invalid credentials!");
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
      <div className='sign-in'>
        <Grid container component="main" className='login-container'>
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
              <div className='signin-title'>
                <h3 style={{color: '#1A0D2D'}}>Welcome Back !</h3>
                <h6 style={{color:  '#1A0D2D'}}>Please Sign in to continue...</h6>
              </div>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField 
                  error={!isEmailFormatValid}
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="E-mail Id"
                  id="email"
                  autoComplete="email"
                  value = {input.email}
                  onChange={inputHandler} 
                  helperText = {!isEmailFormatValid ? "Please enter a valid email-id." : ""} 
                />
                <TextField
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
                />
            <div className='forgot m-2' >
                <h6><a href="/forgotpassword">Forgot Password ?</a></h6>
            </div> 
                
                <Button className='signin-button'
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2, backgroundColor: "#014f86"}}
                  onClick={handleLogin}
                >
                  Login
                </Button>
                {alert && !alert.includes('success') &&
                  <Alert sx={{ padding: '0px 16px' }} variant="outlined" severity="error">
                    {alert}
                  </Alert>}
              </Box>
              <div className='signup'>
                <h5>Don't have an account ? <a href="/signup">Register</a></h5>
              </div> 
            </Item>
            </Box>   
        </ThemeProvider> 
        </Grid>
        </Grid>
      </div>
   
  )
}

export default Login
