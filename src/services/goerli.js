import InputDataDecoder from 'ethereum-input-data-decoder'

import web3 from './web3'
import abi from '../abis/Leetchi.json'


// connect to Smart Contract
const address = '0xFCA31f822a5B55059f7826f39D2503e2CFb8395C'  // leetchi-v2 contract
const fromBlock = 8512459
const contract = new web3.eth.Contract(abi, address)
const decoder = new InputDataDecoder(abi)

export {
  address,
  fromBlock,
  contract,
  decoder,
}