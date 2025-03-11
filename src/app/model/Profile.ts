import {UserDetails} from './UserDetails';
import {Reservation} from './Reservation';
import {ReservationRes} from './ReservationRes';

export interface Profile {
  user?: UserDetails;
  imageUrl?: string | null;
  reservations?: ReservationRes[];
}

