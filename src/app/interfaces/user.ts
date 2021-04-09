import { Voice } from './voice';
import { Instrument } from './instrument';
import { Address } from './address';
export interface User {
    codigo?: string;
    name: string;
    email: string;
    confirmEmail: string;
    phone: string;
    password?: string;
    confirmPassword?: string;
    typeUser: string;
    socialReason?: string;
    chavePj?: string;
    address?: Address;
    instruments?: Instrument[];
    voices: Voice[]

}
