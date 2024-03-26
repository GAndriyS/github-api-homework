import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from "@angular/material/table";
import { GithubRepository } from "../models";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-table-widget',
  templateUrl: './table-widget.component.html',
  styleUrl: './table-widget.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
})
export class TableWidgetComponent {
  displayedColumns: string[] = [
    'pos',
    'name',
    'author',
    'html_url',
    'stars',
    'open_issues',
    'last_updated',
    'language',
    'actions'
  ];

  @Input() githubRepositories: GithubRepository[] = [];
  @Input() favorites: number[] = [];
  @Output() toggleFavourite = new EventEmitter<number>();

  isFavorite(id: number) {
    return this.favorites.includes(id);
  }
}
