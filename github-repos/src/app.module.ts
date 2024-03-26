import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GithubService } from './github/github.service';
import { GithubController } from './github/github.controller';
import { FavoritesService } from './github/favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './github/favorite.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Favorite]),
  ],
  controllers: [GithubController],
  providers: [GithubService, FavoritesService],
})
export class AppModule {}
