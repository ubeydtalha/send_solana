import React, { useEffect, useMemo, useState } from 'react'
import { FC } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js'

export const SendSOL: FC = () => {
  const [amount, setAmount] = useState(0)
  const [recipient, setRecipient] = useState('')
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [balance, setBalance] = useState(0)

  const walletErrorMessage = React.createRef()
  const amountErrorMessage = React.createRef()
  const transactionErrorMessage = React.createRef()
  const balance_ = useMemo(async () => {

    if (connection && publicKey) {
      const balance_ = 0
      balance_ = await connection.getBalance(publicKey);
      setBalance(balance_ / web3.LAMPORTS_PER_SOL)
      return balance_ / web3.LAMPORTS_PER_SOL
    }
    return 0
  }, [connection, publicKey])





  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value))
  }

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    
    setRecipient(e.target.value)
  }

  useEffect(() => {

    if (!connection || !publicKey)
      walletErrorMessage.current.innerHTML = 'Wallet not connected';
    else
      walletErrorMessage.current.innerHTML = '';
  }, [publicKey, connection])


  useEffect(() => {

    if (amount < 0)
      amountErrorMessage.current.innerHTML = 'Amount must be positive';
    else if (amount > balance)
      amountErrorMessage.current.innerHTML = 'Not enough SOL';
    else
      amountErrorMessage.current.innerHTML = '';
  }, [amount])

  const handleSend = async () => {
    try {

      var recieverWallet = new web3.PublicKey(recipient)

      console.log(balance, amount);


      if (!connection || !publicKey) {


        return
      }

      //  Önce cüzdanı açık olan userı kontrol ediyoruz

      if (balance < amount) {

        return
      }




      var transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recieverWallet,
          lamports: amount * web3.LAMPORTS_PER_SOL
        })
      )
      
      

      let signature = ""
      var res =  sendTransaction(
        transaction,
        connection
      ).then(sig => {
        console.log(sig);
        transactionErrorMessage.current.innerHTML = sig
      })


      
    } catch (error) {
      transactionErrorMessage.current.innerHTML = error.message
    }
  }

  return (
    <div>

      <h1>Send SOL</h1>
      <br />
      <p ref={walletErrorMessage}></p>
      <p ref={amountErrorMessage}></p>
      <p ref={transactionErrorMessage}></p>
      <br />
      <div>
        <label>Recipient</label>
        <br />
        <input type="text" onChange={handleRecipientChange} />
        <br />
        <label>Amount</label>
        <br />
        <input type="number" onChange={handleAmountChange} />
        <br />
        <button onClick={handleSend}>Send</button>
      </div>


    </div>
  )
}

