import React, { forwardRef, useState, useRef, useEffect, useImperativeHandle, useCallback } from 'react'

import { useOutsideModal } from '../hooks/useOutsideModal'
import { useOutsideNav } from '../hooks/useOutsideNav'
import {
  ModalBackdrop,
  ModalWrapper,
  ModalHeader,
  DropdownModal,
  ModalBody,
} from '../styles/modal-style'


export const ModalHelps = forwardRef(({ subject }, ref) => {
  const [open, setOpen] = useState(false)
  const [subjectModal, setSubjectModal] = useState('')
  const innerRef  = useRef(null)
  const dropdownModalRef = useRef(null)
  const [isActiveModal, setIsActiveModal] = useOutsideNav(dropdownModalRef, false)

  useImperativeHandle(ref, () => {
    return {
      displayName: 'modal-helps',
      open: () => setOpen(true),
      close: () => setOpen(false)
    }
  })

  useOutsideModal(innerRef, () => setOpen(!open))

  const handleModal = useCallback(section => {
    setIsActiveModal(false)
    switch (section) {
      case 'network':
        setSubjectModal(section)
        break
      case 'create-bank':
        setSubjectModal(section)
        break
      case 'pay-bank':
        setSubjectModal(section)
        break
      case 'questions':
        setSubjectModal(section)
        break
      default:
        break
    }
  }, [setIsActiveModal])

  useEffect(() => {
    handleModal(subject)
  }, [subject, handleModal])

  return (
    <>
      {open && (<ModalBackdrop>
        <ModalWrapper width="800px" height="300px" top="100px">
          <div ref={innerRef}>
            <ModalHeader>
              <h3>Foire aux questions</h3>
              <DropdownModal className="dropdown-modal">
                <button onClick={() => setIsActiveModal(!isActiveModal)}>Aides?</button>
                <nav
                  ref={dropdownModalRef}
                  className={`menu ${isActiveModal ? "active": "inactive"}`}
                >
                  <ul>
                    <li onClick={() => handleModal('network')}>Se connecter au réseau</li>
                    <li onClick={() => handleModal('create-bank')}>Créer une cagnotte</li>
                    <li onClick={() => handleModal('pay-bank')}>Verser la cagnotte</li>
                  </ul>
                </nav>
              </DropdownModal>
            </ModalHeader>
            <ModalBody>
              {subjectModal === 'network'
                ? (<>
                    <h4>Se connecter au réseau</h4>
                    <p>Votre navigateur moderne doit se connecter au réseau Kovan pour interagir avec l'application décentralisée.</p>
                  </>)
                : ''
              }
              {subjectModal === 'create-bank'
                ? (<>
                    <h4>Créer une cagnotte</h4>
                    <p>Votre cagnotte est crée sur le réseau Kovan et nécessite d'avoir des faucet Kovan sur votre compte avec un portefeuille de cryptomonnaie avec des ether crédité.</p>
                  </>)
                : ''
              }
              {subjectModal === 'pay-bank'
                ? (<>
                    <h4>Verser la cagnotte</h4>
                    <p>Vous êtes autorisé à verser le contenu de la cagnotte au destinataire que vous avez désigné en créant la cagnotte.</p>
                  </>)
                : ''
              }
            </ModalBody>
          </div>
        </ModalWrapper>
      </ModalBackdrop>
      )}
    </>
  )
})
