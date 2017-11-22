import { HnapiService } from './hnapi.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ListComponent, ItemComponent],
  exports: [ListComponent, ItemComponent],
  providers: [HnapiService]
})
export class SharedModule {}
