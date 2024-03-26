import { HttpService } from '@nestjs/axios';
export declare class GithubService {
    private httpService;
    constructor(httpService: HttpService);
    getTopRatedRepositories(page?: string, sortOrder?: string): Promise<import("rxjs").Observable<any>>;
}
