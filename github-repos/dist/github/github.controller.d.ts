import { GithubService } from './github.service';
import { FavoritesService } from './favorites.service';
export declare class GithubController {
    private readonly _githubService;
    private readonly _favoritesService;
    constructor(_githubService: GithubService, _favoritesService: FavoritesService);
    getTopRatedRepositories(page: string, sorting: string): Promise<import("rxjs").Observable<any>>;
    addFavorite(id: number): Promise<number[]>;
    getFavorites(): Promise<number[]>;
}
