import { useState, useCallback, useContext } from 'react'
import { ConnectContext } from '../context/connect-context'


export const getNetwork = chainId => {
  let net = ''

  switch (chainId) {
    case '0x1':
      net = 'Ethereum'
      break
    case '0xaa36a7':
      net = 'Sepolia'
      break
    default:
      break
  }
  return net
}


export const useInjected = () => {
  const [accounts, setAccounts] = useState([])
  const [network, setNetwork] = useState('')
  const [, setAccountsApp] = useContext(ConnectContext)

  // connect to Ethereum wallet
  const [isConnectedWeb3, setIsConnectedWeb3] = useState(false)

  const connectToWeb3 = useCallback(async () => {
    if(window.ethereum) {
      try {
        const resp = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setAccounts([resp][0].concat(accounts))
        setAccountsApp([resp][0].concat(accounts))
        const getChainId = async () => {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' })
          setNetwork(getNetwork(chainId))
        }
        getChainId()
  
        await window.ethereum.on('chainChanged', chainId => { 
          setNetwork(getNetwork(chainId))
          document.location.reload()
        })
        setIsConnectedWeb3(true)
      } catch (err) {
        console.log(err)
      }
      
    } else {
      alert("Install Metamask")
    }
  }, [accounts, setAccounts, setNetwork, setAccountsApp])

  return {
    connectToWeb3,
    isConnectedWeb3,
    accounts,
    network,
  }
}