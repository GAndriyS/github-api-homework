import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubSearchResponse, SortOrder } from './models';

@Injectable({
  providedIn: 'root'
})
export class GithubReposService {
  constructor(private _httpClient: HttpClient) {}

  getRepos(page: number, sorting: SortOrder) {
    return this._httpClient.get<GithubSearchResponse>(`http://localhost:3000/github/top-rated?page=${page}&sorting=${sorting}`);
  }

  getFavorites() {
    return this._httpClient.get<number[]>('http://localhost:3000/github/favorites');
  }

  toggleFavorite(id: number) {
    return this._httpClient.post<number[]>('http://localhost:3000/github/favorites', { id });
  }
}
