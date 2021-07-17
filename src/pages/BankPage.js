import React, { useState, useRef, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ConnectContext } from '../context/connect-context'
import { BankDatasContext } from '../context/bankDatas-context'
import { LoadingContext } from '../context/loading-context'
import { CardBank } from '../components/CardBank'
import { changeUnity, searchWord } from '../utils/time'
import {
  bankConnect,
  sendContribute,
  callTimeLeft,
  callDetails,
  callTotal,
  sendWithdraw,
  sendFinalize,
  callIsContributors
} from '../services/banks'
import {
  BankStyle,
} from '../styles/Bank-styles'


const BankPage = ({ history }) => {
  const [datasValue, setDatasValue] = useState('')
  const initInfos = {
    time: 0,
    total: 0,
    minCap: 0,
    people: 0,
    isContributor: null,
    finish: null
  }
  const [infos, setInfos] = useState(initInfos)
  const [textUnity, setTextUnity] = useState('')

  const [accountsApp, ] = useContext(ConnectContext)
  const [bankDatas, ] = useContext(BankDatasContext)
  const [ , setIsLoading] = useContext(LoadingContext)
  const valueRef = useRef('')
  let { slug } = useParams()
  const { time, total, minCap, people, isContributor, finish } = infos

  const notifySend = () => toast('Validation de votre transaction')
  const notifySuccess = () => toast('Succès de la Participation!')
  const notifyFinalize = () => toast('Cagnotte finaliser!')
  const notifyWithdraw = () => toast('Montant retirer!')
  const notifyConnect = () => toast.error('Activer votre compte!')
  const notifyRequired = () => toast.error('Le champ est requis!')
  const notifyFail = () => toast.error('Echec d\'envoi!')

  useEffect(() => {
    if (bankDatas) {
      bankDatas.forEach(data => {
        if (Object.keys(data)[0] === slug) {
          setDatasValue(Object.values(data)[0])
        }
      })
    }
  }, [bankDatas, slug])

  useEffect(() => {
    const bankContract = bankConnect(accountsApp[0], slug)
    const details = async () => {
      const details = await callDetails(bankContract)
      if (details) {
        const { minCap, countContributors, isFinalized } = details
        setInfos(state => ({ ...state, minCap: minCap }))
        setInfos(state => ({ ...state, people: countContributors }))
        setInfos(state => ({ ...state, finish: isFinalized }))
      }
    }
    details()
    const totalBank = async () => {
      const total = await callTotal(bankContract)
      if (total) {
        setInfos(state => ({ ...state, total: parseFloat(total.toString().substr(0, 4)) }))
      }
    }

    totalBank()
    const timeLeft = async () => {
      const time = await callTimeLeft(bankContract)
      const { convertTime, unity } = changeUnity(time)
      setInfos(state => ({ ...state, time: convertTime }))
      const { word } = searchWord(unity)
      const textUnity = `${unity} ${word}`
      setTextUnity(textUnity)
    }
    timeLeft()
    if (accountsApp[0]) {
      const isContributor = async () => {
        const contributor = await callIsContributors(bankContract, accountsApp[0])
        if (parseInt(contributor) > 0) {
          setInfos(state => ({ ...state, isContributor: true }))
        } else {
          setInfos(state => ({ ...state, isContributor: false }))
        }
      }
      isContributor()
    }
  }, [accountsApp, slug])

  const handlePay = async e => {
    e.preventDefault()
    setIsLoading(true)
    if (!accountsApp[0]) {
      notifyConnect()
      return
    }
    if (valueRef.current.value === '') {
      notifyRequired()
      return
    }
    const value = valueRef.current.value
    notifySend()
    const resp = await sendContribute(accountsApp[0], slug, value)
    if (resp && resp.code) {
      notifyFail()
      return
    }
    notifySuccess()
    valueRef.current.value = ''
    setIsLoading(false)
    history.go(0)
  }

  const handleFinalize = async () => {
    setIsLoading(true)
    if (!accountsApp[0]) {
      notifyConnect()
      return
    }
    const bankContract = bankConnect(accountsApp[0], slug)
    const resp = await sendFinalize(bankContract)
    if (resp && resp.code) {
      notifyFail()
      return
    }
    notifyFinalize()
    setIsLoading(false)
    history.go(0)
  }

  const handleWithdraw = async () => {
    setIsLoading(true)
    if (!accountsApp[0]) {
      notifyConnect()
      return
    }
    const bankContract = bankConnect(accountsApp[0], slug)
    notifyWithdraw()
    await sendWithdraw(bankContract)
    setIsLoading(false)
    history.go(0)
  }

  return (
    <BankStyle>
      <div className="participates">
        <div className="group-infos">
          <div>
            <span>{total} ETH</span>
            <label>Collectes</label>
          </div>
          <div>
            <span>{time}</span>
            <label>{textUnity}</label>
          </div>
          <div className="info-people">
            <span>{people}</span>
            <label>Participations</label>
          </div>
        </div>
        <div className="contribute">
          {!finish && time > 0
            ? (<>
              <label>Montant </label>
              <input
                type="text"
                placeholder="0.1"
                disabled={finish || time === 0}
                ref={valueRef}
              />
              ETH
              <img
              src="https://leetchi.ethprod.xyz/img/Ethereum_logo.png"
              alt="ethereum logo"
              width="15px"
              />
            </>)
            : ''
          }
        </div>
        {!finish && (
          <div className="group-submit">
            {time > 0
              ? <input type="submit" onClick={handlePay} value="Je participe" />
              : time === 0
                ? <input type="submit" value="Finalize" onClick={handleFinalize} />
                : ''
            }
          </div>
        )}
        {finish && (
          <div className="group-submit">
            {minCap > total
              ? isContributor
                ? <input type="submit" value="Retirer" onClick={handleWithdraw} />
                :'Cagnotte fermée'
              : 'Succès de la collecte'
            }
          </div>
        )}
      </div>
      <CardBank datasValue={datasValue} />
      <ToastContainer />
    </BankStyle>
  )
}

export default BankPage
