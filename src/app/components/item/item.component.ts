import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { IMAGES_SIZES } from '../../constants/image-sizes';
import { TvShow } from '../../models/tvshow';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() itemData: Movie | TvShow | null = null;
  @Input() itemMode: string | null = null;

  routerUri: string = '/movie/';
  itemName: string | null = null;
  imageSizes = IMAGES_SIZES;

  constructor() {}

  ngOnInit(): void {
    if (this.itemMode == 'TvShow') {
      this.routerUri = '/tvshow/';
      this.itemName = (this.itemData as TvShow).name;
    } else {
      this.itemName = (this.itemData as Movie).title;
    }
  }
}
