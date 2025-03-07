import {Vehicle} from './Vehicle';
import {User} from './User';

export interface LocationWithVehicles {
  id?: number;
  name: string;
  address: string;
  city: string;
  telephone: string;
  email: string;
  vehicles?: Vehicle[];
  user?: User;

}

