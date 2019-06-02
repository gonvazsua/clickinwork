import { Evento } from './evento.model';
import { FichajeStatus } from './fichaje-status.enum';
import { TipoEvento } from './tipo-evento.enum';

export class Fichaje {
    status: string;
    user_id : string;
    creation_date : Date;
    time_events: Array<Evento>;
    
}