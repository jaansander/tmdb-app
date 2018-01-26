import { Component, OnInit, TemplateRef } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  searchTerm: string;
  sortParameter: number;
  nextPage: number;
  previousPage: number;
  movies = [];

  constructor(private tmdbService: TmdbService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.nextPage = Number(params['page'] || 0) + 1;
      this.previousPage = Number(params['page'] || 0) - 1;
      this.sortParameter = params['sort'];
      let sortBy = this.getSortBy(this.sortParameter);
      this.searchTerm = '';
      this.getMovies(sortBy, this.nextPage);
    });
  }

  getMovies(sortBy: string, page: number) {
    this.tmdbService.getMovies(sortBy, page).then(res => {
      this.movies = res;
    })
  }

  getSortBy(queryParam: number) {
    if (queryParam == 1) {
      return 'now_playing'
    } else if (queryParam == 2) {
      return 'top_rated'
    } else if (queryParam == 3) {
      return 'popular'
    }
    return 'upcoming'
  }

  search() {
    if (this.searchTerm) {
      this.tmdbService.searchMovies(this.searchTerm).subscribe(res => {
        this.movies = res;
      });
    }
  }
}
