import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit {

  details: any;
  credits: any;

  constructor(private tmdbService: TmdbService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let actorId = params['id'];
      this.getDetails(actorId);
      this.getCredits(actorId);
    })
  }

  getDetails(id: any) {
    this.tmdbService.getActor(id).then(res => {
      this.details = res;
    })
  }

  getCredits(id: any) {
    this.tmdbService.getCredits(id).then(res => {
      this.credits = res;
    })
  }
}
