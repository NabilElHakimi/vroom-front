import {Vehicle} from './Vehicle';

export interface ReservationReq{

  id?: number
  vehicle?: Vehicle,
  startDate?: string | undefined,
  endDate?: string | undefined
  status?: string | undefined
  totalPrice?: number | undefined

}
