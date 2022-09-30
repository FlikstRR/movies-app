import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IMAGES_SIZES } from '../../constants/image-sizes';
import { TvShow } from '../../models/tvshow';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [trigger('slideFade', [state('void', style({ opacity: 0 })), transition('void <=> *', [animate('1s')])])]
})
export class SliderComponent implements OnInit {
  @Input() items: Movie[] | TvShow[] = [];
  @Input() isBanner: boolean = false;
  @Input() sliderMode: string = 'Movie';

  movieData: Movie[] = [];
  tvShowData: TvShow[] = [];
  currentSlideIndex: number = 0;
  readonly imageSizes = IMAGES_SIZES;

  ngOnInit(): void {
    if (!this.isBanner) {
      setInterval(() => {
        this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
      }, 5000);
    }

    if (this.sliderMode == 'TvShow') {
      this.tvShowData = this.items as TvShow[];
    } else {
      this.movieData = this.items as Movie[];
    }
  }
}
