import web3 from './web3'
import bankAbi from '../abis/Bank.json'
import { contract, fromBlock } from './goerli'


export const bankConnect = (account, bankAddress) => {
  try {
    return new web3.eth.Contract(bankAbi, bankAddress, {
      from: account,
      gasLimit: 3000000,
    })
  } catch (err) {
    console.log(err)
  }
}

export const sendStart = async (account, receiver, multihash, delay, minCap) => {
  try {
    // contract address: 0xFCA31f822a5B55059f7826f39D2503e2CFb8395C
    // _receiver: 0xD4474EA7e714dA701D75915bAe9614ba1a9dBD36
    // _multihash: QmXeDksYDm7Z1HGXQ27LVDsRtzKoC8P3b6skviBJ21FSgb
    // _daly: 200
    // _minCap: 3000000000000000000 //3 * 10 ** 18 wei // 0.2 ether
    const bankMinCap = web3.utils.toWei(minCap, 'ether')
    const bankResp = await contract.methods.startCagnotte(
      account,     // creator
      receiver,    // receiver
      multihash,   // multihash
      delay,       // delay
      bankMinCap   // minCap
    ).send({ from: account })
    console.log(bankResp)

  } catch (err) {
    console.log(err)
  }
}

export const eventBanks = async () => {
  try {
    const getEvents = await contract.events.cagnotteStarted({
      fromBlock: fromBlock,
    })
    getEvents
      .on('data', async e => {
        console.log(e.returnValues)
      })
      .on('error', console.error);

  } catch (err) {
    console.log(err)
  }
}

export const events = async () => {
  try {
    return await contract.events.allEvents()
  } catch (err) {
    console.log(err)
  }
}

export const callIpfsCagnotte = async (bankContract, bankAddress) => {
  try {
    return await bankContract.methods.ipfsCagnotte(bankAddress).call()
  } catch (err) {
    console.log(err)
  }
}

export const callAllCagnottes = async bankContract => {
  try {
   return await bankContract.methods.getAllCagnottes().call()
  } catch (err) {
    console.log(err)
  }
}

export const sendContribute = async (account, bankAddress, value) => {
  try {
    const bankContract = bankConnect(account, bankAddress)
    const contributeValue = web3.utils.toWei(value, 'ether') // '0.1' ether
    await bankContract.methods.contribute().send({ value: contributeValue })
  } catch (err) {
    console.log(err)
  }
}

export const sendFinalize = async bankContract => {
  try {
    return await bankContract.methods.finalize().send()
  } catch (err) {
    console.log(err)
  }
}

export const sendWithdraw = async bankContract => {
  try {
    const bankWithdraw = await bankContract.methods.withdraw().send()
    console.log('withdraw', bankWithdraw)
  } catch (err) {
    console.log(err)
  }
}

export const callTimeLeft = async bankContract => {
  try {
    const timeLeft = await bankContract.methods.getTimeLeft().call()
    return parseInt(timeLeft)
  } catch (err) {
    console.log(err)
  }
}

export const callDetails = async bankContract => {
  try {
    const details = await bankContract.methods.getDetails().call()
    const minCapValue = web3.utils.fromWei(details[4], 'ether')
    const totalValue = web3.utils.fromWei(details[5], 'ether')

    return {
      creator: details[0],
      receiver: details[1],
      multihash: details[2],
      timeout: parseInt(details[3]),
      minCap: parseFloat(minCapValue),
      total: parseFloat(totalValue),
      countContributors: parseInt(details[6]),
      isFinalized: details[7]
    }
  } catch (err) {
    console.log(err)
  }
}

export const callCreator = async bankContract => {
  try {
    return await bankContract.methods.creator().call()
  } catch (err) {
    console.log(err)
  }
}

export const callReceiver = async bankContract => {
  try {
    return await bankContract.methods.receiver().call()
  } catch (err) {
    console.log(err)
  }
}

export const callMultihash = async bankContract => {
  try {
    return await bankContract.methods.multihash().call()
  } catch (err) {
    console.log(err)
  }
}

export const callTimeout = async bankContract => {
  try {
    const timeout = await bankContract.methods.timeout().call()
    return parseInt(timeout)
  } catch (err) {
    console.log(err)
  }
}

export const callMinCap = async bankContract => {
  try {
    const minCap = await bankContract.methods.minCap().call()
    return parseFloat(minCap)
  } catch (err) {
    console.log(err)
  }
}

export const callTotal = async bankContract => {
  try {
    const total = await bankContract.methods.total().call()
    const totalValue = web3.utils.fromWei(total, 'ether')
    return parseFloat(totalValue)
  } catch (err) {
    console.log(err)
  }
}

export const callCountContributors = async bankContract => {
  try {
    return await bankContract.methods.countContributors().call()
  } catch (err) {
    console.log(err)
  }
}

export const callIsStarted = async bankContract => {
  try {
    return await bankContract.methods.isStarted().call()
  } catch (err) {
    console.log(err)
  }
}

export const callIsFinalized = async bankContract => {
  try {
    return await bankContract.methods.isFinalized().call()
  } catch (err) {
    console.log(err)
  }
}

export const callIsContributors = async (bankContract, account) => {
  try {
    return await bankContract.methods.contributors(account).call()
  } catch (err) {
    console.log(err)
  }
}
