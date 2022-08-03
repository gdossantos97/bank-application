import { React, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTransfers, reset } from '../features/transfers/transferSlice'
import { UserContext } from '../index'
import WithdrawForm from '../Components/withdrawForm';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper, Typography, Stack, Container } from '@mui/material'
import { Box } from '@mui/system'

const theme = createTheme();

function Withdraw() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { transfers, isError, message } = useSelector((state) => state.transfers)

  const value = useContext(UserContext);
  const { balance } = value

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

  return (
<ThemeProvider theme={theme}>
  <Container component="main" maxWidth="xs">
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
                <Typography varient="h1" align="center" >Withdraw from your account</Typography>
                <Typography varient="h3" align="center">Your current balance is: {balance}</Typography>
              </Stack>

              <WithdrawForm />
           
        </Paper>
      
      </Box>
    </Container>
  </ThemeProvider>
  )
}

export default Withdraw


//