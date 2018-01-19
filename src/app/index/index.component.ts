import { Component, OnInit, TemplateRef } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { ActivatedRoute, Params } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

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
      let sortParameter = this.getSortBy(params['sort']);
      this.getMovies(sortParameter);
    });
  }

  getMovies(sortBy: string) {
    this.tmdbService.getMovies(sortBy).then(res => {
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  search(term: string): void {
    if (term) {
      this.tmdbService.searchMovies(term).subscribe(res => {
        this.movies = res;
      });
    }
  }
}
