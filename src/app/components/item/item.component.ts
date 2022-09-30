import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { IMAGES_SIZES } from '../../constants/image-sizes';
import { TvShow } from '../../models/tvshow';
import { Item } from '../../models/shared';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() itemData: Item | null = null;
  @Input() itemMode: string | null = null;

  routerUri: string = '/movie/';
  imageSizes = IMAGES_SIZES;

  constructor() {}

  ngOnInit(): void {
    if (this.itemMode == 'TvShow') {
      this.routerUri = '/tvshow/';
    }
  }
}
