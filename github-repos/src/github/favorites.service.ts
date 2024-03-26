import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private _favoritesRepository: Repository<Favorite>,
  ) {}

  async toggleFavorite(
    favoriteId: number,
  ): Promise<{ action: string; favoriteId: number }> {
    // Check if the favorite ID already exists
    const existingFavorite = await this._favoritesRepository.findOne({
      where: { favoriteId },
    });

    if (existingFavorite) {
      // If it exists, remove it
      await this._favoritesRepository.remove(existingFavorite);
      return { action: 'removed', favoriteId };
    } else {
      // If it doesn't exist, add it
      const newFavorite = this._favoritesRepository.create({ favoriteId });
      await this._favoritesRepository.save(newFavorite);
      return { action: 'added', favoriteId };
    }
  }

  async getFavorites(): Promise<number[]> {
    const favorites = await this._favoritesRepository.find();
    return favorites.map((favorite) => favorite.favoriteId);
  }
}
