import { Component, OnInit, TemplateRef } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { nearer } from 'q';

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
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(private modalService: BsModalService,
    private tmdbService: TmdbService,
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
      console.log(this.movies);
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  search() {
    if (this.searchTerm) {
      this.tmdbService.searchMovies(this.searchTerm).subscribe(res => {
        this.movies = res;
        console.log(this.movies);
      });
    }
  }
}
