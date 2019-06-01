import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from './token/token.service';
import { CustomDatepipePipe } from './custom-datepipe/custom-datepipe.pipe';

@NgModule({
  declarations: [CustomDatepipePipe],
  imports: [
    CommonModule
  ],
  exports: [
    CustomDatepipePipe
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
