import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mapTvShowToItem, TvShow } from '../../models/tvshow';
import { IMAGES_SIZES } from '../../constants/image-sizes';
import { Subscription } from 'rxjs';
import { TvshowsService } from '../../services/tvshows.service';
import { Credits, Images, Item, Video } from '../../models/shared';

@Component({
  selector: 'tvshow',
  templateUrl: './tvshow.component.html',
  styleUrls: ['./tvshow.component.scss']
})
export class TvshowComponent implements OnInit, OnDestroy {
  tvShow: TvShow | null = null;
  tvShowItem: Item | null = null;
  id: string | null = null;
  imageSizes = IMAGES_SIZES;
  tvShowVideos: Video[] = [];
  tvShowImages: Images | null = null;
  tvShowCredits: Credits | null = null;
  similarTvShows: Item[] = [];

  private urlSubscription: Subscription | null = null;

  constructor(private route: ActivatedRoute, private tvShowService: TvshowsService) {}

  ngOnInit(): void {
    this.urlSubscription = this.route.params.subscribe(({ id }) => {
      this.id = id;
      this.get(id);
      this.getVideos(id);
      this.getImages(id);
      this.getCredits(id);
      this.getSimilar(id);
    });
  }

  ngOnDestroy(): void {
    this.urlSubscription?.unsubscribe();
  }

  paginate(event: any) {
    if (this.id) {
      this.getSimilar(this.id, event.page + 1);
    }
  }

  getVideos(id: any) {
    this.tvShowService.getVideos(id).subscribe((videosData) => {
      this.tvShowVideos = videosData;
    });
  }

  get(id: string) {
    this.tvShowService.get(id).subscribe((tvShowData) => {
      this.tvShow = tvShowData;
      this.tvShowItem = mapTvShowToItem(tvShowData);
    });
  }

  getImages(id: string) {
    this.tvShowService.getImages(id).subscribe((imagesData) => {
      this.tvShowImages = imagesData;
    });
  }

  getCredits(id: string) {
    this.tvShowService.getCredits(id).subscribe((creditsData) => {
      this.tvShowCredits = creditsData;
    });
  }

  getSimilar(id: string, page: number = 1) {
    this.tvShowService.getSimilar(id, page).subscribe((tvShows) => {
      this.similarTvShows = tvShows.map((tvShow) => mapTvShowToItem(tvShow));
    });
  }
}
