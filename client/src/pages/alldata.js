import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTransfers, reset } from '../features/transfers/transferSlice'
import TransferItem from '../Components/transferItem'
import { UserContext } from '../index'

function AllData() {

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

  return (<div>
    <form className="table">
      <section className="heading">
        <h2 className="history">Transaction History</h2>
      </section>

      <table className="table table-striped table-dark">
        <thead id="thread">
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        {transfers.length > 0 ? (
          <tbody className="transfers">
            {transfers.map((transfer) => (
              <TransferItem key={transfer._id} transfer={transfer}></TransferItem>
            ))}
          </tbody>
        ) : (
          <th scope="col">There are no transactions to display</th>
        )}
      </table>
      <div className="allDataBalance">Your current balance is: ${balance}</div>
    </form>
  </div>
  )

}

export default AllData