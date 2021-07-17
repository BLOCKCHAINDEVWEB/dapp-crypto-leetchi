import React, { useState, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'

import { ModalHelps } from './ModalHelps'
import { useInjected } from '../hooks/useInjected'
import { useOutsideNav } from '../hooks/useOutsideNav'
import { ConnectContext } from '../context/connect-context'
import { LoadingContext } from '../context/loading-context'
import {
  HeaderNav,
  TitleNav,
  BodyNav,
  DropdownNav,
} from '../styles/nav-styles'
import {
  SpinnerAnimate
} from '../styles/icons-spinner'


export const Navigation = () => {
  const [subject, setSubject] = useState('')

  const modalRef = useRef()
  const dropdownNavRef = useRef(null)

  const [isLoading, ] = useContext(LoadingContext)
  const [accountsApp, ] = useContext(ConnectContext)

  const [isActiveNav, setIsActiveNav] = useOutsideNav(dropdownNavRef, false)
  const { connectToWeb3, isConnectedWeb3, network } = useInjected()

  const handleHelps = help => {
    setSubject(help)
    setIsActiveNav(!isActiveNav)
    modalRef.current.open()
  }

  return (
    <>
      <HeaderNav>
        <TitleNav>CryptoLeetchi</TitleNav>
        <BodyNav>
          <ul>
            <li>
              <Link to="/home">
                Acceuil
              </Link>
            </li>
            <li>
              <Link to="/form">
                Fomulaire
              </Link>
            </li>
            <li>
              <Link to="/banks">
                Cagnottes solidaires
              </Link>
            </li>
            <DropdownNav className="dropdown">
              <button onClick={() => setIsActiveNav(!isActiveNav)}>Aides?</button>
              <nav
                ref={dropdownNavRef}
                className={`menu ${isActiveNav ? "active": "inactive"}`}
              >
                <ul>
                  <li onClick={() => handleHelps('network')}>Se connecter au réseau</li>
                  <li onClick={() => handleHelps('create-bank')}>Créer une cagnotte</li>
                  <li onClick={() => handleHelps('pay-bank')}>Verser la cagnotte</li>
                </ul>
              </nav>
            </DropdownNav>
            <li className="btn-connect">
              {isConnectedWeb3
                ? network !== 'Kovan'
                  ? <p className="close">Kovan!</p>
                  : <p className="open">{accountsApp[0].substring(0, 10)}...</p>
                : network === 'Kovan'
                  ? ''
                  : <button onClick={connectToWeb3}><img src="https://leetchi.ethprod.xyz/img/logo_metamask_250w.jpg" alt="logo Metamask" /></button>
              }
            </li>
            <li className="spoiler">
              {isLoading
                ? <img src={`data:image/svg+xml;utf8,${SpinnerAnimate}`} width="25" height="25" alt="spinner dynamic" />
                : ''
              }
            </li>
          </ul>
        </BodyNav>
      </HeaderNav>
      <ModalHelps ref={modalRef} subject={subject} />
    </>
  )
}