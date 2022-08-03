import { React, useContext, useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { newTransfer, getTransfers, reset } from '../features/transfers/transferSlice'
import initialState from '../features/transfers/transferSlice'
import DepositForm from '../Components/depositForm'
import TransferItem from '../Components/transferItem'
import { UserContext } from '../index'
import { Paper, Typography, Stack, Container } from '@mui/material'
import { Box } from '@mui/system'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Deposit() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { transfers, isLoading, isError, message } = useSelector((state) => state.transfers)

  const value = useContext(UserContext);
  const { balance, setBalance } = value

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }
    dispatch(getTransfers())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])


  const sum = useEffect(() => {
    let balance = 0;
    transfers.forEach(element => {
      balance += element.text;
      setBalance(balance)
    });
  }, [transfers])

  return (

<ThemeProvider theme={theme}>
  
  <Container component="main" maxWidth="xs">
    <CssBaseline />
          <Box
            sx={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            >
      
        <Paper elevation={3}>
            
              <Stack spacing={2} >
              <Typography component="h1" varient="h3" align="center" sx={{ mt: 2 }}> Welcome {user.name}</Typography>
                <Typography varient="h1" align="center" >Make a Deposit</Typography>
                <Typography varient="h3" align="center">Your current balance is: {balance}</Typography>
              </Stack>

              <DepositForm />
           
        </Paper>
      
      </Box>
    </Container>
    
  </ThemeProvider>
  
  );

}