import React, { createContext, useState } from 'react'

const BankNameContext = createContext([])

const BankNameProvider = props => {
  const [nameBank, setNameBank] = useState('')

  return (
    <BankNameContext.Provider value={[nameBank, setNameBank]}>
      {props.children}
    </BankNameContext.Provider>
  )
}

export { BankNameContext, BankNameProvider }