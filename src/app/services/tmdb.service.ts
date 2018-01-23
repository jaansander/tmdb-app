import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class TmdbService {

  apiKey: string = '628babe0eb8b3622fc13b91f31928cd3';
  apiRoot: string = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getMovies(sortBy: string): Promise<any> {
    return this.http.get(this.apiRoot + '/movie/' + sortBy + '?api_key=' + this.apiKey + '&language=en-US&page=1')
      .toPromise()
      .then(res => this.formatResponse(res))
  }

  getMovieDetails(movieId: any) {
    return this.http.get(this.apiRoot + '/movie/' + movieId + '?api_key=' + this.apiKey + '&language=en-US&append_to_response=videos')
      .toPromise()
  }

  formatResponse(response: any) {
    let movies = [];
    response.results.forEach(element => {
      var movie: Movie = <Movie>{};
      movie.id = element.id;
      movie.title = element.title;
      movie.overview = element.overview;
      movie.posterPath = element.poster_path;
      movie.releaseDate = element.release_date;
      movie.voteAverage = element.vote_average;
      movies.push(movie);
    });
    return movies;
  }

  searchMovies(searchTerm: any): any {
    return this.http.get(this.apiRoot + '/search/movie?api_key=' + this.apiKey + '&language=en-US&query=' + searchTerm + '&page=1')
      .map(res => this.formatResponse(res))
  }

  getMovieCast(movieId: any): Promise<any>  {
    return this.http.get(this.apiRoot + '/movie/' + movieId + '/credits?api_key=' + this.apiKey)
      .toPromise()
      .then(res => this.formatCastResponse(res))
  }

  formatCastResponse(response: any){
    return response.cast;
  }

}

export interface Movie {
  id: string;
  title: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
}