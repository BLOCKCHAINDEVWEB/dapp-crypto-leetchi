import React, { createContext, useState } from 'react'

const ConnectContext = createContext([])

const ConnectProvider = props => {
  const [accountsApp, setAccountsApp] = useState([])

  return (
    <ConnectContext.Provider value={[accountsApp, setAccountsApp]}>
      {props.children}
    </ConnectContext.Provider>
  )
}

export { ConnectContext, ConnectProvider }