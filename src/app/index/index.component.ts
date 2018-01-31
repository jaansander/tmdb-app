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
  totalPages: number;
  oldSortParameter: any = 0;
  movies = [];

  constructor(private tmdbService: TmdbService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.nextPage = Number(params['page'] || 0) + 1;
      this.previousPage = Number(params['page'] || 0) - 1;
      this.sortParameter = params['sort'];
      if (this.isSearchResultNextPageClicked()) {
        this.search(this.nextPage);
      } else {
        this.searchTerm = '';
        let sortBy = this.getSortBy(this.sortParameter);
        this.oldSortParameter = this.sortParameter;
        this.getMovies(sortBy, this.nextPage);
      }
    });
  }

  isSearchResultNextPageClicked() {
    return this.oldSortParameter == this.sortParameter
      && this.oldSortParameter != 0
      && this.searchTerm != '';
  }

  getMovies(sortBy: string, page: number) {
    this.tmdbService.getMovies(sortBy, page).then(res => {
      this.totalPages = res.total_pages;
      this.movies = res.results;
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

  search(page: number) {
    if (this.searchTerm) {
      this.tmdbService.searchMovies(this.searchTerm, page).subscribe(res => {
        this.totalPages = res.total_pages;
        this.movies = res.results;
      });
    }
  }
}
