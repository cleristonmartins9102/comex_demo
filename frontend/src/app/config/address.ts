import { environment } from '../../environments/environment';

export interface AddressInt {
  local: string;
  ip: string;
}

export class Address {
  backend: AddressInt[] = [
    { local: 'aws-backend', ip: environment.baseUrl}
    // { local: 'aws-backend', ip: '192.168.5.97'}
  ];

  bkAddress() {
    return this.backend;
  }
}
