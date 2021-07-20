import InputDataDecoder from 'ethereum-input-data-decoder'

import web3 from './web3'
import abi from '../abis/Leetchi.json'


// connect to Smart Contract
const address = '0x0564003fc948b5b3eac3ecec548b3f37692e559c'  // leetchi-v2 contract
const fromBlock = 26229679
const contract = new web3.eth.Contract(abi, address)
const decoder = new InputDataDecoder(abi)

export {
  address,
  fromBlock,
  contract,
  decoder,
}