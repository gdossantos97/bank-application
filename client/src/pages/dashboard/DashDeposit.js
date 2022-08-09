import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTransfers, reset } from '../../features/transfers/transferSlice'
import { UserContext } from '../../index';

function preventDefault(event) {
  event.preventDefault();
}

export default function DashDeposits() 

{


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
    <React.Fragment>
      <Title>Balance</Title>
      <Typography component="p" variant="h4">
        ${balance}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        
      </Typography>
    </React.Fragment>
  );
}