import {Vehicle} from './Vehicle';
import {UserDetails} from './UserDetails';

export interface ReservationRes {

  id?: number
  vehicle?: Vehicle,
  user?: UserDetails,
  startDate?: string | undefined,
  endDate?: string | undefined
  status?: string | undefined
  totalPrice?: number | undefined

}
