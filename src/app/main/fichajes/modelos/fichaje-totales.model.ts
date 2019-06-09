import { Fichaje } from './fichaje.model';
import { Evento } from './evento.model';
import { DateFactoryService } from 'src/app/shared/date-factory/date-factory.service';

export class FichajeTotales extends Fichaje {

    comienzo: Date;
    fin: Date;
    eventosIntermedios: Array<Evento>
    totalTrabajado: Date;
    totalPausas: Date;

    constructor(fichaje: Fichaje) {

        const dateFactory = new DateFactoryService()

        super();
        this.status = fichaje.status;
        this.time_events = fichaje.time_events;
        this.user_id = fichaje.user_id;
        this.creation_date = fichaje.creation_date;
        
    }
    
}