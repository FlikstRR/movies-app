import { Component, OnInit } from '@angular/core';
import { GenresService } from '../../services/genres.service';
import { Genre } from '../../models/genres';
import { first } from 'rxjs';

@Component({
  selector: 'genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];
  constructor(private genresService: GenresService) {}

  ngOnInit(): void {
    this.genresService.getGenres().subscribe((genresData) => {
      this.genres = genresData;
    });
  }
}
