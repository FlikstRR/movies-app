import { Component, OnInit } from '@angular/core';
import { TvShow } from '../../models/tvshow';
import { TvshowsService } from 'src/app/services/tvshows.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.scss']
})
export class TvshowsComponent implements OnInit {
  tvShows: TvShow[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;

  constructor(private route: ActivatedRoute, private tvShowsService: TvshowsService) {}

  paginate(event: any) {
    const pageNumber = event.page + 1;
    if (this.searchValue) {
      this.getPagedTvShows(pageNumber, this.searchValue);
    } else {
      this.getPagedTvShows(pageNumber);
    }
  }

  getPagedTvShows(page: number = 1, searchKeyword?: string) {
    this.tvShowsService.search(page, searchKeyword).subscribe((tvShows) => {
      this.tvShows = tvShows;
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      this.getPagedTvShows();
    });
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagedTvShows(1, this.searchValue);
    }
  }
}
