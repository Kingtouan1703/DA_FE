import { LoginParams } from './login.type'

export interface RegisterParams extends LoginParams {
  name: string
}
