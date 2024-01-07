import React, { createContext, useState, useContext, useEffect } from 'react'

import { BankHashContext } from './bankHash-context'
import { projectIPFSDomainName } from '../utils/const'

const BankDatasContext = createContext([])

const BankDatasProvider = props => {
  const [bankDatas, setBankDatas] = useState([])
  const [banksAddress, setBanksAddress] = useState([])
  const [banksHash, ] = useContext(BankHashContext)

  useEffect(() => {
    const fetchDatas = () => {
      banksHash.map(async bankAddress => {
        const key = Object.keys(bankAddress)[0]
        if (!banksAddress.includes(key)) {
          setBanksAddress(state => ([...state, key]))
        }
      })

      banksHash.map(async bankAddress => {
        const key = Object.keys(bankAddress)[0]
        if (!banksAddress.includes(key)) {
          const value = Object.values(bankAddress)[0]
          try {
            const resp = await fetch(`https:/${projectIPFSDomainName}/ipfs/${value}`)
            const result = await resp.json()
            setBankDatas(state => ([ ...state, { [key]: result } ]))
          } catch (err) {
            console.log(err)
          }
        }
      })
    }

    fetchDatas()
  }, [banksAddress, banksHash])

  return (
    <BankDatasContext.Provider value={[bankDatas, setBankDatas]}>
      {props.children}
    </BankDatasContext.Provider>
  )
}

export { BankDatasContext, BankDatasProvider }
