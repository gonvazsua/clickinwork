import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fichaje-evento',
  templateUrl: './fichaje-evento.component.html',
  styleUrls: ['./fichaje-evento.component.css']
})
export class FichajeEventoComponent implements OnInit {

  //@Input() isDisabled : string;
  @Input() text      : string;
  @Input() icon      : string;
  @Input() colorClass: string;
  @Input() eventType : string;

  @Input() 
  set isDisabled(value) {
    this._isDisabled = value === 'true';
  }

  @Output() clickEvent : EventEmitter<string>;

  private _isDisabled : boolean;

  constructor() { 
    this.clickEvent = new EventEmitter<string>();
  }

  ngOnInit() {
  }

  dispatchClick() {
    if(!this.isDisabled) {
      this.clickEvent.emit(this.eventType);
    }
  }

}
