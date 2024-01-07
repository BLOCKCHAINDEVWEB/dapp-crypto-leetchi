import InputDataDecoder from 'ethereum-input-data-decoder'

import web3 from './web3'
import abi from '../abis/Leetchi.json'

// connect to Smart Contract
const address = '0xfD33C789C1ED4107B138533eF694BF2Df53607be'  // CryptoLeetchi contract
const fromBlock = 5039384
const contract = new web3.eth.Contract(abi, address)
const decoder = new InputDataDecoder(abi)

export {
  address,
  fromBlock,
  contract,
  decoder,
}