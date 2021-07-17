import React, { useState, useContext } from 'react'
import Select from 'react-select';

import { BankDatasContext } from '../context/bankDatas-context';
import { CardsBank } from '../components/CardsBank'
import {
  BanksStyles,
  CardsStyle,
} from '../styles/Banks-styles'


const BanksPage = ({ history }) => {
  const [category, setCategory] = useState('toutes')
  const [bankDatas, ] = useContext(BankDatasContext)

  const options = [
    { label: 'toutes catégories', value: 'toutes' },
    { label: 'Anniversaire', value: 'anniversaire' },
    { label: 'Mariage', value: 'mariage' },
    { label: 'Entraide', value: 'entraide' }
  ]

  const handleCategory = category => {
    setCategory(category.value)
  }

  return (
    <BanksStyles>
      <Select
        className='filter'
        defaultValue={options[0]}
        onChange={handleCategory}
        options={options}
      />
      <CardsStyle>
        {bankDatas.map(bankAddress => (
          <CardsBank key={Object.keys(bankAddress)[0]}
            bankData={Object.values(bankAddress)[0]}
            categories={category}
            width="150px"
            onSubmit={() => history.push(`/bank/${Object.keys(bankAddress)[0]}`)}
          />
        ))}
      </CardsStyle>
    </BanksStyles>
  )
}

export default BanksPage
