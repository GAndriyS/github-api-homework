import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class GithubService {
  constructor(private httpService: HttpService) {}

  async getTopRatedRepositories(page = '1', sortOrder = 'desc') {
    const url = `https://api.github.com/search/repositories?q=stars:>1&sort=stars&per_page=100&page=${page}&order=${sortOrder}`;
    return this.httpService.get(url).pipe(map((response) => response.data));
  }
}
