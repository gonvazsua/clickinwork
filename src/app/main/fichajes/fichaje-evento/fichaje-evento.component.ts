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
  @Input() isEnabledWith : string;

  @Input() 
  set isEnabled(value) {
    console.log("EVENTO ", this.eventType);
    console.log("Is enabled: ", value);
    this._isEnabled = value === 'true';
  }

  @Output() clickEvent : EventEmitter<string>;

  private _isEnabled : boolean;

  constructor() { 
    this.clickEvent = new EventEmitter<string>();
  }

  ngOnInit() {
  }

  dispatchClick() {
    if(this._isEnabled) {
      this.clickEvent.emit(this.eventType);
    }
  }

}
