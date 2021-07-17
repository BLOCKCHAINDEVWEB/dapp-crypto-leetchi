import React from 'react'

import {
  CardUnitStyle,
} from '../styles/Bank-styles'


export const CardBank = ({ datasValue }) => {
  const { ipfsImgURL, title, description } = datasValue

  return (<>
    {datasValue && (
      <CardUnitStyle>
        <img
          src={`https://ipfs.io/ipfs/${ipfsImgURL.split('/').pop()}`}
          alt="from ipfs"
          width="450"
        />
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </CardUnitStyle>
    )}
  </>)
}