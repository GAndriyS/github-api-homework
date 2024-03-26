import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-languages-stats',
  standalone: true,
  templateUrl: './languages-stats.component.html',
  styleUrl: './languages-stats.component.scss',
  imports: [
    NgxChartsModule
  ],
})
export class LanguagesStatsComponent {
  @Input() data: {name: string; value: number}[] = [];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = 'Products';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
}
