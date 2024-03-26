import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';
export declare class FavoritesService {
    private _favoritesRepository;
    constructor(_favoritesRepository: Repository<Favorite>);
    toggleFavorite(favoriteId: number): Promise<{
        action: string;
        favoriteId: number;
    }>;
    getFavorites(): Promise<number[]>;
}
