import React, { createContext, useState } from 'react'

const LoadingContext = createContext([])

const LoadingProvider = props => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <LoadingContext.Provider value={[isLoading, setIsLoading]}>
      {props.children}
    </LoadingContext.Provider>
  )
}

export { LoadingContext, LoadingProvider }