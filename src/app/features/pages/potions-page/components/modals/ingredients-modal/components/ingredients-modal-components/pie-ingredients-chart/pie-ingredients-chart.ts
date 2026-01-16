import {ChangeDetectionStrategy, Component, input, OnInit} from '@angular/core';
import {PotionIngredient} from '../../../../../../../../../core/types/potion.types';
import {ChartConfiguration, ChartData, ChartType} from 'chart.js';

@Component({
  selector: 'app-pie-ingredients-chart',
  standalone: false,
  templateUrl: './pie-ingredients-chart.html',
  styleUrl: './pie-ingredients-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieIngredientsChart implements OnInit {
  ingredients = input<Array<PotionIngredient>>([]);

  public pieChartType: ChartType = 'pie';
  public chartData: ChartData<'pie'> | null = null;
  public chartOptions: ChartConfiguration['options'];

  public ngOnInit(): void {
    this.initChart();
  }

  private initChart(): void {
    this.chartData = {
      labels: this.ingredients().map(i => i.ingredient),
      datasets: [{
        data: this.ingredients().map(i => i.quantity),
        backgroundColor: this.ingredients().map(i => i.color)
      }]
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          padding: 12,
          cornerRadius: 6,
          bodyFont: {
            size: 14,
          },
          titleFont: {
            size: 14,
          },
          displayColors: true,
          usePointStyle: true,
          callbacks: {
            label: (context: any) => {
              const ingredient = this.ingredients()[context.dataIndex];
              const totalQuantity = this.ingredients().reduce((sum, i) => sum + i.quantity, 0);
              const percentage = ((ingredient.quantity / totalQuantity) * 100).toFixed(1);

              return [
                `Количество: ${ingredient.quantity} ед. (${percentage}%)`,
                `Цена за ед.: ${ingredient.unitPrice} зол.`,
                `Общая стоимость: ${ingredient.totalPrice} зол.`
              ];
            },
          }
        }
      }
    };
  }
}
