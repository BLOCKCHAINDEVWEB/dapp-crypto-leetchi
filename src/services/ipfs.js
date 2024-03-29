import { create } from 'ipfs-http-client'

const projectId = process.env.REACT_APP_INFURA_API_PROJECT_ID
const projectSecret = process.env.REACT_APP_INFURA_API_PROJECT_SECRET
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
  'base64'
)}`

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
})

export default ipfs
