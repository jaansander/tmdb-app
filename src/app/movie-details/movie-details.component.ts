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
  cast: any;
  @Input() movieId: string;

  constructor(private tmdbService: TmdbService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMovieDetails(this.movieId);
    this.getMovieCast(this.movieId);
  }

  getMovieDetails(movieId: any) {
    this.tmdbService.getMovieDetails(movieId).then(res => {
      this.movie = res;
      this.trailerUrl = 'https://www.youtube.com/embed/' + this.getTrailerKey(this.movie.videos.results);
    })
  }

  getTrailerKey(videos: any) {
    let trailerKey = "";
    videos.forEach(element => {
      if (element.name.indexOf('Trailer') !== -1 || element.name.indexOf('trailer') !== -1)
        trailerKey = element.key;
    });    return trailerKey;
  }

  getMovieCast(movieId: any){
    this.tmdbService.getMovieCast(movieId).then(res => {
      this.cast = res;
    })
  }


}
