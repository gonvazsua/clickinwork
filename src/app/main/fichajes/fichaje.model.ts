import { Evento } from './evento.model';
import { FichajeStatus } from './fichaje-status.enum';
import { TipoEvento } from './tipo-evento.enum';

export class Fichaje {
    status: string;
    user_id : string;
    creation_date : Date;
    time_events: Array<Evento>;

    isPaused() {
        const lastEvent = this.getLastEvent();
        return lastEvent.type === TipoEvento.PAUSE;
    }

    isResumed() {
        const lastEvent = this.getLastEvent();
        return lastEvent.type === TipoEvento.START || lastEvent.type === TipoEvento.CONTINUE;
    }

    getSortedEvents() {
        const sorted = new Array<Evento>();
        Object.assign(sorted, this.time_events);
        return sorted
            .sort((e1, e2) => e1.time > e2.time ? 1 : e1.time < e2.time ? -1 : 0)
    }

    getLastEvent() {
        return this.getSortedEvents().pop() || new Evento();
    }
    
    isStarted() {
        return this.getSortedEvents().find(e => e.type === TipoEvento.START) ? true : false;
    }

    isStopped() {
        return this.getSortedEvents().find(e => e.type === TipoEvento.STOP) ? true : false;
    }
}