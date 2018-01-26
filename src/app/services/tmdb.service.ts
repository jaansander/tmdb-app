import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class TmdbService {

  apiKey: string = '628babe0eb8b3622fc13b91f31928cd3';
  apiRoot: string = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getMovies(sortBy: string, page: number): Promise<any> {
    return this.http.get(this.apiRoot + '/movie/' + sortBy + '?api_key=' + this.apiKey + '&language=en-US&page=' + page)
      .toPromise()
      .then(res => res)
  }

  getMovieDetails(movieId: any) {
    return this.http.get(this.apiRoot + '/movie/' + movieId + '?api_key=' + this.apiKey + '&language=en-US&append_to_response=videos')
      .toPromise()
  }

  searchMovies(searchTerm: any): any {
    return this.http.get(this.apiRoot + '/search/movie?api_key=' + this.apiKey + '&language=en-US&query=' + searchTerm + '&page=1')
      .map(res => res)
  }

  getMovieCast(movieId: any): Promise<any> {
    return this.http.get(this.apiRoot + '/movie/' + movieId + '/credits?api_key=' + this.apiKey)
      .toPromise()
      .then(res => this.formatCastResponse(res))
  }

  getActor(actorId: any): Promise<any> {
    return this.http.get(this.apiRoot + '/person/'+ actorId + '?api_key=' + this.apiKey +'&language=en-US')
      .toPromise()
  }

  getCredits(actorId: any): Promise<any> {
    return this.http.get(this.apiRoot + '/person/' + actorId + '/movie_credits?api_key=' + this.apiKey +'&language=en-US')
      .toPromise() 
      .then(res => this.formatCastResponse(res))
  }
  
  formatCastResponse(response: any) {
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