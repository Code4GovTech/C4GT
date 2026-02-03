import { NgModule } from '@angular/core';
import { HostComponent } from './button/host.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [HostComponent, ButtonComponent],
  exports: [HostComponent, ButtonComponent],
})
export class ComponentsModule {}
