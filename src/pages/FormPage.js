import React, { useState, useContext, useRef, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import moment from 'moment'
import 'react-toastify/dist/ReactToastify.css'

import ipfs from '../services/ipfs'
import pinata from '../services/pinata'
import { ConnectContext } from '../context/connect-context'
import { BankNameContext } from '../context/bankName-context'
import { LoadingContext } from '../context/loading-context'
import { sendStart } from '../services/banks'
import {
  FormSection,
  FormStyles,
} from '../styles/Form-styles'


const FormPage = ({ history }) => {
  const [imgValue, setImgValue] = useState('')
  const [stateImg, setStateImg] = useState({
    buffer: '',
    ipfsImgHash: ''
  })
  const [dataOwner, setDataOwner] = useState({
    category: '',
    emailOwner: '',
    addressOwner: '',
    emailRecipient: '',
    addressRecipient: '',
    title: '',
    description: '',
    ipfsImgURL: ''
  })
  const [checkbox, setCheckbox] = useState(false)
  const [dateline, setDateline] = useState(0)

  const [accountsApp, ] = useContext(ConnectContext)
  const [nameBank, ] = useContext(BankNameContext)
  const [ , setIsLoading] = useContext(LoadingContext)

  const emailOwnerRef = useRef('')
  const addressOwnerRef = useRef('')
  const emailRecipientRef = useRef('')
  const addressRecipientRef = useRef('')
  const titleRef = useRef('')
  const descriptionRef = useRef('')
  const imageFileRef = useRef('')
  const category = ['anniversaire', 'mariage', 'entraide']
  const datenow = Math.floor(moment(Date.now()).valueOf() / 1000)

  const notifySend = () => toast('Création de la Cagnotte!')
  const notifyWait = () => toast('Le traitement de la cagnotte en cours prend un certain temps!')
  const notifyConnect = () => toast.error('Activer votre compte!')
  const notifyRequired = () => toast.error('Tous les champs sont requis!')
  const notifyFail = () => toast.error('Echec d\'envoi!')

  useEffect(() => {
    if (accountsApp[0]) {
      addressOwnerRef.current.value = accountsApp[0]
    }
    titleRef.current.value = nameBank
    setDataOwner(state => ({ ...state, addressOwner: accountsApp[0] }))
  }, [accountsApp, nameBank])

  // obtain image file
  const captureFile = e => {
    const file = e.target.files[0]
    setImgValue(file.name)
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => convertToBuffer(reader)
  }

  // file is converted to a buffer to prepare for uploading to IPFS
  const convertToBuffer = async reader => {
    const buffer = await Buffer.from(reader.result)
    setStateImg(state => ({ ...state, buffer: buffer }))
  }

  // send buffer image to ipfs and pinning at Pinata
  const sendImgIpfs = async buffer => {
    try {
      const respImgHash = await ipfs.add(buffer)
      const ipfsImgHash = respImgHash[0].hash
      pinImgHash(ipfsImgHash)
      return ipfsImgHash
    } catch (err) {
      notifyFail()
      console.log(err)
    }
  }

  // image's pinning to Pinata
  const pinImgHash = async ipfsImgHash => {
    try {
      const resp = await pinata.pinByHash(ipfsImgHash)
      setStateImg(state => ({ ...state, ipfsHash: resp.ipfsHash }))
      setDataOwner(state => ({ ...state, ipfsUrl: `https://ipfs.io/ipfs/${resp.ipfsHash}` }))
    } catch (err) {
      notifyFail()
      console.log(err)
    }
  }

  const sendJsonIpfs = async jsonDatas => {
    try {
      const respJsonHash = await ipfs.add(Buffer.from(JSON.stringify(jsonDatas)))
      const ipfsJsonHash = respJsonHash[0].hash
      pinJsonHash(ipfsJsonHash)
      return ipfsJsonHash
    } catch (err) {
      notifyFail()
      console.log(err)
    }
  }

  const pinJsonHash = async ipfsJsonHash => {
    try {
      await pinata.pinByHash(ipfsJsonHash)
    } catch (err) {
      notifyFail()
      console.log(err)
    }
  }

  const handleReset = () => {
    emailOwnerRef.current.value = ''
    addressOwnerRef.current.value = ''
    emailRecipientRef.current.value = ''
    addressRecipientRef.current.value = ''
    titleRef.current.value = ''
    descriptionRef.current.value = ''
    setImgValue('')
    setIsLoading(false)
    history.push(`banks`)
  }

  const handleCreate = async e => {
    e.preventDefault()
    if(emailOwnerRef.current.value === ''
    || addressOwnerRef.current.value === ''
    || emailRecipientRef.current.value === ''
    || addressRecipientRef.current.value === ''
    || titleRef.current.value === ''
    || descriptionRef.current.value === ''
    || imgValue ===''
    || !checkbox
    || dateline <= 0) {
      notifyRequired()
      return
    }
    if (!accountsApp[0]) notifyConnect()

    try {
      setIsLoading(true)
      const imgHash = await sendImgIpfs(stateImg.buffer)
      const jsonDatas = {
        'category': `${dataOwner.category}`,
        'emailOwner': `${dataOwner.emailOwner}`,
        'addressOwner': `${dataOwner.addressOwner}`,
        'emailRecipient': `${dataOwner.emailRecipient}`,
        'addressRecipient': `${dataOwner.addressRecipient}`,
        'title': `${dataOwner.title}`,
        'description': `${dataOwner.description}`,
        'ipfsImgURL': `ipfs://${imgHash}`
      }
      const jsonHash = await sendJsonIpfs(jsonDatas)
      const { addressOwner, addressRecipient } = jsonDatas

      const cron = dateline       // secondes
      const minCap = '0.1'        // ether
      notifySend()
      notifyWait()
      const resp = await sendStart(addressOwner, addressRecipient, jsonHash, cron, minCap)
      if (resp && resp.code) {
        notifyFail()
        return
      }
      handleReset()
    } catch (err) {
      setIsLoading(false)
      notifyFail()
      console.log(err)
    }
  }
  const handleDate = e => {
    e.preventDefault()
    const { value } = e.target
    const nextDate = Math.floor(moment(value).valueOf() / 1000)
    if (nextDate > datenow) {
      setDateline(nextDate - datenow)
      return
    }
  }

  return (
    <>
      <FormSection>
        <FormStyles className="form-style">
          <div className="card-radio">
            <span
              onClick={() => setDataOwner({ ...dataOwner, category: category[0] })}
              className="radio"
            >
              Anniversaire
            </span>
            <span
              onClick={() => setDataOwner({ ...dataOwner, category: category[1] })}
              className="radio"
            >
              Mariage
            </span>
            <span
              onClick={() => setDataOwner({ ...dataOwner, category: category[2] })}
              className="radio"
            >
              Entraide
            </span>
          </div>
          <div className="form-radio">
            <div className="radio">
              <input
                type="radio"
                name="category"
                value={category[0]}
                checked={dataOwner.category === category[0]}
                onChange={e => setDataOwner({ ...dataOwner, category: e.target.value })}
              />
              <label htmlFor="cat1"></label>
            </div>
            <div className="radio">
              <input
                type="radio"
                name="category"
                value={category[1]}
                checked={dataOwner.category === category[1]}
                onChange={e => setDataOwner({ ...dataOwner, category: e.target.value })}
              />
              <label htmlFor="cat2"></label>
            </div>
            <div className="radio">
              <input
                type="radio"
                name="category"
                value={category[2]}
                checked={dataOwner.category === category[2]}
                onChange={e => setDataOwner({ ...dataOwner, category: e.target.value })}
              />
              <label htmlFor="cat3"></label>
            </div>
          </div>
          <div className="group-keys">
            <div className="group-key">
              <label>Email expéditeur</label>
              <input
                type="email"
                name="emailOwner"
                className="form-control"
                placeholder="Email expéditeur"
                ref={emailOwnerRef}
                onChange={e => setDataOwner({ ...dataOwner, emailOwner: e.target.value })}
              />
            </div>
            <div className="group-key">
              <label>Adresse publique de l'expéditeur</label>
              <input
                type="text"
                name="addressOwner"
                className="form-control"
                placeholder="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
                ref={addressOwnerRef}
                // value={dataOwner.addressOwner}
                onChange={e => setDataOwner({ ...dataOwner, addressOwner: e.target.value })}
              />
            </div>
          </div>
          <div className="group-keys">
            <div className="group-key">
              <label>Email destinataire</label>
              <input
                type="email"
                name="emailRecipient"
                className="form-control"
                placeholder="Email destinataire"
                ref={emailRecipientRef}
                onChange={e => setDataOwner({ ...dataOwner, emailRecipient: e.target.value })}
              />
            </div>
            <div className="group-key">
              <label>Adresse publique du destinataire</label>
              <input
                type="text"
                name="addressRecipient"
                className="form-control"
                placeholder="0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2"
                ref={addressRecipientRef}
                onChange={e => setDataOwner({ ...dataOwner, addressRecipient: e.target.value })}
              />
            </div>
          </div>
          <div className="group-desc">
            <label>Titre</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Titre"
              ref={titleRef}
              // value={dataOwner.title}
              onChange={e => setDataOwner({ ...dataOwner, title: e.target.value })}
            />
          </div>
          <div className="group-desc">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="12"
              cols="33"
              ref={descriptionRef}
              onChange={e => setDataOwner({ ...dataOwner, description: e.target.value })}
            />
          </div>
          <div className="group-file">
            <label>Photo :</label>
            {imgValue !== ''
              ? <span>{imgValue}</span>
              : ''
            }
            <div className="upload-btn">
              <button className="btn">Parcourir</button>
              <input
                type="file"
                name="imageFile"
                ref={imageFileRef}
                onChange={captureFile}
              />
            </div>
          </div>
          <div className="group-time">
            <input
              type="datetime-local"
              onChange={handleDate}
            />
          </div>
          <div className="group-terms">
            <input
              type="checkbox"
              checked={checkbox.checked}
              onChange={e => setCheckbox(e.target.checked)}
            />
            <span>Je comprend que le seuil minimal des versements est de 0.1 ETH.</span><br />
            <span className="last-child">Auquel cas les contibuteurs reviendront retirer leurs participations.</span>
            <p>Aussi vos informations ci-dessus ne seront plus modifibales.</p>
          </div>
          <div className="group-submit">
            <input
              type="submit"
              onClick={handleCreate}
              value="Je créee une cagnotte"
            />
          </div>
          <ToastContainer />
        </FormStyles>
      </FormSection>
    </>
  )
}

export default FormPage
