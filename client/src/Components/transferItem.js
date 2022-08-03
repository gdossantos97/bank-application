import React from 'react'

function TransferItem({transfer}) {
  const type = transfer.text > 0 ? "Deposit" : "Withdraw";
  return (
    <tr className="transfer">
      <td>{type}</td> 
      <td>${transfer.text}</td>
      <td>{new Date(transfer.createdAt).toLocaleString('en-us')} </td>
    </tr>
  )
}

export default TransferItem
