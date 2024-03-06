import { NgModule } from '@angular/core';
import { AlertComponent } from './Alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropDownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AlertComponent, LoadingSpinnerComponent, DropDownDirective],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropDownDirective,
    CommonModule,
  ],
})
export class SharedModule {}
