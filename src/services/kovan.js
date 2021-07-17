import InputDataDecoder from 'ethereum-input-data-decoder'

import web3 from './web3'
import abi from '../abis/Leetchi.json'


// connect to Smart Contract
// txHash created address: 0xd23abac5b9729ff01cd538630e979e1d5bc8c1dc3ea1b5c887ea502d9671ad26
const address = '0x1fbd83808fecccace9012b4c59718ca523476779'  // leetchi-v2 contract
const fromBlock = 26145291
const contract = new web3.eth.Contract(abi, address)
const decoder = new InputDataDecoder(abi)

export {
  address,
  fromBlock,
  contract,
  decoder,
}