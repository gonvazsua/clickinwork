import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from './token/token.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule { 
  
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ TokenService ]
    };
  }

}
