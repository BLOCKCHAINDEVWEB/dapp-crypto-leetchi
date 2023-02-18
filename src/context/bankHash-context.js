import React, { createContext, useState, useEffect } from 'react'

import { contract } from '../services/goerli'


const BankHashContext = createContext([])

const BankHashProvider = props => {
  const [banksHash, setBanksHash] = useState([])

  useEffect(() => {
    const getAllBanks = async () => {
      try {
        const allBanks = await contract.methods.getAllCagnottes().call()
        allBanks.map(async bank => {
          const hash = await contract.methods.ipfsCagnotte(bank).call()
          setBanksHash(state => ([ ...state, { [bank]: hash }]))
        })
      } catch (err) {
        console.log(err)
      }
    }

    getAllBanks()
  }, [])

  return (
    <BankHashContext.Provider value={[banksHash, setBanksHash]}>
      {props.children}
    </BankHashContext.Provider>
  )
}

export { BankHashContext, BankHashProvider }
