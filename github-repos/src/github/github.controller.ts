import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { GithubService } from './github.service';
import { FavoritesService } from './favorites.service';

@Controller('github')
export class GithubController {
  constructor(
    private readonly _githubService: GithubService,
    private readonly _favoritesService: FavoritesService,
  ) {}

  @Get('top-rated')
  async getTopRatedRepositories(
    @Query('page') page: string,
    @Query('sorting') sorting: string,
  ) {
    return await this._githubService.getTopRatedRepositories(page, sorting);
  }

  @Post('favorites')
  @HttpCode(200)
  async addFavorite(@Body('id') id: number): Promise<number[]> {
    await this._favoritesService.toggleFavorite(id);
    const favorites = await this._favoritesService.getFavorites();
    return favorites;
  }

  @Get('favorites')
  async getFavorites(): Promise<number[]> {
    return await this._favoritesService.getFavorites();
  }
}
