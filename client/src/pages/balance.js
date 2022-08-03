import { Box, Container, Typography, Grid } from '@mui/material';
import { React, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getTransfers, reset } from '../features/transfers/transferSlice'
import { UserContext } from '../index'



function Balance() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { transfers, isError, message } = useSelector((state) => state.transfers)

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
    <Box 
    sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <Grid> 
        <Container component="main" maxWidth="sm">
          <Typography component="h1" variant="h3" >Welcome {user && user.name}</Typography>
          <Container component="secondary" maxWidth="sm">
            <Box sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
                    }} >
          <Typography component="h1" variant="h6">your current balance is: ${balance}</Typography>
          </Box>
          </Container>
        </Container>
      </Grid>
  </Box>
  )

}

export default Balance;