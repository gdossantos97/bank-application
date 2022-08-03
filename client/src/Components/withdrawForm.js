import { Box, Container, TextField, Button, Typography } from '@mui/material'
import { React, useContext, useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newTransfer } from '../features/transfers/transferSlice'
import { UserContext } from '../index'
import CssBaseline from '@mui/material/CssBaseline';

function WithdrawForm() {

    const [text, setText] = useState('')
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const value = useContext(UserContext);
    const { balance, setBalance } = value

    const { user } = useSelector((state) => state.auth)
    const { transfers, isLoading, isError, message } = useSelector((state) => state.transfers)

    const dispatch = useDispatch()

    const sum = useEffect(() => {
        let balance = 0;
        transfers.forEach(element => {
            balance += element.text;
            setBalance(balance)
        });
    }, [transfers])

    const onSubmit = (e) => {
        e.preventDefault()

        let total = 0;

        let sum = transfers.forEach(element => {
          total += element.text;
          return total;
        })
    
        let balance = Number(total) - Number(text);

        if (isNaN(text)) {
            setError("input must be a number.")
            setTimeout(() => setError(''), 1500)
        } else if (text > balance) {
            setError("Insufficient funds");
            setTimeout(() => setError(''), 1500);
        } else if (text <= 0) {
            setError("Must Be positive number.");
            setTimeout(() => setError(''), 1500);
        } else {
            dispatch(newTransfer({ 
                text: -Math.abs(text),
                balance: balance
             }))
            setSuccess(`Success: Here is your withdraw of $${text}.`)
            setTimeout(() => setSuccess(''), 3000);
            setError(null)
        }
        setText('')
    }


    return (
        <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography component="h1" variant="h5">
            Withdraw Funds
          </Typography>          
      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1, mb: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            className="input"
            type='number'
            name='text'
            id='number'
            sx={{ mt: 3, mb: 2 }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
        >
              Submit
        </Button>
          {error && <><br></br><br></br><div style={{ color: 'red' }}>{error}</div></>}
        {success && <><br></br><br></br><div style={{ color: 'green' }}>{success}</div></>}
      </Box>
      </Box>
    </Container>
    )
}

export default WithdrawForm
