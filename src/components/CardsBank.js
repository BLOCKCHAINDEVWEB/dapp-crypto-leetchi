import React, { useState } from 'react'

import {
  CardStyle,
} from '../styles/Banks-styles'


export const CardsBank = ({ history, bankData, categories, onSubmit }) => {
  const [cardEdit, ] = useState('')
  const [editCard, ] = useState(false)

  const { category, title, description, ipfsImgURL } = bankData

  return (<>
    {bankData && (<>
      {!editCard && (
        categories === category
          ? <CardStyle>
              {ipfsImgURL !== ''
                ? <img
                  src={`https://ipfs.io/ipfs/${ipfsImgURL.split('/').pop()}`}
                  alt="from ipfs"
                  width="150"
                  height="150"
                />
                : <div className="wait-img">Attendre quelques secondes...</div>
              }
              {title !== ''
                ? <h2>{title}</h2>
                : <span>Attendre...</span>
              }
              {description !== ''
                ? <p>{description.substring(0, 150)}...</p>
                : <span>Attendre...</span>
              }
              {ipfsImgURL !== '' && title !== '' && description !== '' &&
                <input type="button" value="Contribuer" onClick={onSubmit} />
              }
            </CardStyle>
         : categories === 'toutes'
            ? <CardStyle>
              <img
                src={`https://ipfs.io/ipfs/${ipfsImgURL.split('/').pop()}`}
                alt="from ipfs"
                width="150"
                height="150"
              />
              <h2>{title}</h2>
              <p>{description.substring(0, 150)}...</p>
              <input type="button" value="Contribuer" onClick={onSubmit} />
            </CardStyle>
          : ''
      )}
        {editCard && (<>
          {history.push(`/bank/${cardEdit}`)}
        </>
      )}
    </>)}
  </>) 
}