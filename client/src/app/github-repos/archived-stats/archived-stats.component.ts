import { Component, Input } from '@angular/core';
import { NgxChartsModule } from "@swimlane/ngx-charts";

@Component({
  selector: 'app-archived-stats',
  standalone: true,
  imports: [
    NgxChartsModule
  ],
  templateUrl: './archived-stats.component.html',
  styleUrl: './archived-stats.component.scss',
})
export class ArchivedStatsComponent {
  @Input() data: {name: string; value: number}[] = []
}
