import pinataSDK from '@pinata/sdk'

const pinata = new pinataSDK(process.env.REACT_APP_PINATA_KEY, process.env.REACT_APP_PINATA_SECRET);

export default pinata
