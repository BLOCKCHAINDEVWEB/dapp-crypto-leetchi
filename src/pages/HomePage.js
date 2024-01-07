import React, { useRef, useContext } from 'react'

import { BankNameContext } from '../context/bankName-context'
import {
  HomeStyle,
  HomeTextImg,
} from '../styles/Home-styles'

const HomePage = ({ history}) => {
  const nameRef = useRef(null)
  const [ , setNameBank] = useContext(BankNameContext)

  const handleName = () => {
    setNameBank(nameRef.current.value)
    nameRef.current.value = ''
    history.push(`/form`)
  }
  return (
    <>
    <HomeStyle />
    <HomeTextImg>
      <div className="group-text">
        <h1>Je crée ma cagnotte pour une</h1>
        <p>Dépense à plusieurs</p>
        <input
          type="text"
          ref={nameRef}
          placeholder="Choisissez un nom pour votre cagnotte"
        />
        <input
          type="button"
          value="Je crée"
          onClick={handleName}
        />
        <p>Pour l'anniversaire de Sarah, ses amis ont crée une cagnotte pour lui offrir un cadeau inoubliable!</p>
      </div>

    </HomeTextImg>
    </>
  )
}

export default HomePage
