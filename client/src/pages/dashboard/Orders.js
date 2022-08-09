import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Typography } from '@mui/material';

import { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTransfers, reset } from '../../features/transfers/transferSlice'
import TransferItem from '../../Components/transferItem'
import { UserContext } from '../../index'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Made with ❤️ by '}
      <Link color="inherit" href="https://github.com/gdossantos97/">
        Gabriel Santos ||
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  
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
    <React.Fragment>
      <Title>Transaction History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        {transfers.length > 0 ? (
        <TableBody className="transfers">
            {transfers.map((transfer) => (
              <TransferItem key={transfer._id} transfer={transfer}></TransferItem>
            ))}
        </TableBody>
        ) : (
          <TableCell>There are no transactions to display </TableCell>
        ) }
      </Table>
    </React.Fragment>
  );
}