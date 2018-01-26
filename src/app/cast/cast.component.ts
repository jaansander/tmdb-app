import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MovieCardComponent } from '../movie-card/movie-card.component';


@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit {
  @Input() cast: any;

  constructor(private movieCardComponent: MovieCardComponent) {}

  ngOnInit() {
  }

  hide(){
    this.movieCardComponent.hide();
  }

}
