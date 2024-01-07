import Web3 from 'web3';

const web3 = new Web3(window.ethereum || new Web3.providers.WebsocketProvider('ws://localhost:8545'))

export default web3;
