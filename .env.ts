import DEV from './.env.dev'
import PROD from './.env.prod'

export interface ENV {
  BASE_URL: string
}


let env: ENV = process.env.NODE_ENV === 'production' ? PROD : DEV

export default env