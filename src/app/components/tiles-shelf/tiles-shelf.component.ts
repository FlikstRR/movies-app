import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'tiles-shelf',
  templateUrl: './tiles-shelf.component.html',
  styleUrls: ['./tiles-shelf.component.scss']
})
export class TilesShelfComponent {
  @Input() items: Movie[] = [];
  @Input() title: string = '';
}
