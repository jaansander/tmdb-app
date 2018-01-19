import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  trailerUrl: any;
  @Input() movieId: string;

  constructor(private tmdbService: TmdbService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMovieDetails(this.movieId);
  }

  getMovieDetails(movieId: any) {
    this.tmdbService.getMovieDetails(movieId).then(res => {
      this.movie = res;
      this.trailerUrl = 'https://www.youtube.com/embed/' + this.getTrailerKey(this.movie.videos.results);
      console.log(this.movie)
    })
  }

  getTrailerKey(videos: any) {
    let trailerKey = "";
    videos.forEach(element => {
      if (element.name.indexOf('Trailer') !== -1 || element.name.indexOf('trailer') !== -1)
        trailerKey = element.key;
    });
    return trailerKey;
  }


}
