import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiKey = 'TVUJ_API_KLIC';
  private baseUrl = 'https://api.themoviedb.org/3';
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
