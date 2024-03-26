import { Component } from '@angular/core';
import { GithubReposService } from './github-repos.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { GithubRepository, GithubSearchResponse, SortOrder } from './models';
import { CommonModule } from '@angular/common';
import { TableWidgetComponent } from './table-widget/table-widget.component';
import { ArchivedStatsComponent } from './archived-stats/archived-stats.component';
import { LanguagesStatsComponent } from './languages-stats/languages-stats.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-github-repos',
  templateUrl: './github-repos.component.html',
  styleUrls: ['./github-repos.component.scss'],
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    TableWidgetComponent,
    CommonModule,
    ArchivedStatsComponent,
    LanguagesStatsComponent,
    MatSlideToggleModule
  ],
})
export class GithubReposComponent {
  githubSearchResponse: GithubSearchResponse | null = null;
  viewRepositories: GithubRepository[] = [];

  page = 1;
  sorting = SortOrder.desc;
  archivedStats: {name: string; value: number}[] = [];
  languageStats: {name: string; value: number}[] = [];
  favorites: number[] = [];

  private _githubRepositories: GithubRepository[] = [];

  constructor(
    private _githubReposService: GithubReposService
  ) {
    this.loadData(this.page, this.sorting);
    this._githubReposService.getFavorites().subscribe((favorites) => this.favorites = favorites);
  }

  loadMore() {
    this.page += 1;
    this.loadData(this.page, this.sorting);
  }

  changeSorting() {
    this.page = 1;
    this.sorting = this.sorting === SortOrder.asc ? SortOrder.desc : SortOrder.asc;
    this.loadData(this.page, this.sorting);
  }

  toggleFavourite(id: number) {
    this._githubReposService.toggleFavorite(id)
      .subscribe((favorites) => {
        this.favorites = favorites;
      });
  }

  toggleFavouritesData({checked}: {checked: boolean}) {
    if (checked) {
      this.viewRepositories = this._githubRepositories.filter((repo) => this.favorites.includes(repo.id));
    } else {
      this.viewRepositories = this._githubRepositories;
    }
    this.calcStats(this.viewRepositories);
  }

  private loadData(page: number, sorting: SortOrder) {
    this._githubReposService.getRepos(page, sorting).subscribe(data => {
      this.githubSearchResponse = data;
      this._githubRepositories = this.page === 1 ? data.items : [...this._githubRepositories, ...data.items];
      this._githubRepositories = this._githubRepositories.map((repo, index) => ({ ...repo, index: index + 1 }));
      this.viewRepositories = [...this._githubRepositories];

      this.calcStats(this.viewRepositories);
    });
  }

  private calcStats(repositories: GithubRepository[]) {
    let archivedRepos = 0;
    let languageStats: { [key: string]: number } = {};
    repositories.forEach((repo) => {
      archivedRepos = repo.archived ? archivedRepos + 1 : archivedRepos;
      if (repo.language) {
        languageStats[repo.language] = languageStats[repo.language] ? languageStats[repo.language] + 1 : 1;
      }
    });

    this.languageStats = Object.keys(languageStats)
      .map((key) => ({ name: key, value: languageStats[key] }));

    this.archivedStats = [{
      name: 'Archived',
      value: archivedRepos,
    }, {
      name: 'Not archived',
      value: repositories.length - archivedRepos,
    }];
  }
}
