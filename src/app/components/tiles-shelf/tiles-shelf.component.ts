import { Component, Input } from '@angular/core';
import { Item } from '../../models/shared';

@Component({
  selector: 'tiles-shelf',
  templateUrl: './tiles-shelf.component.html',
  styleUrls: ['./tiles-shelf.component.scss']
})
export class TilesShelfComponent {
  @Input() items: Item[] = [];
  @Input() title: string = '';
}
