import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiKey = 'ef32b67b7ef29916aa9f7b2cf99f3ea1';
  private baseUrl = 'https://www.themoviedb.org/';
  private http = inject(HttpClient);

  getPopularMovies(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`
    );
  }

  getPopularTVShows(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/tv/popular?api_key=${this.apiKey}&language=en-US&page=1`
    );
  }
}
