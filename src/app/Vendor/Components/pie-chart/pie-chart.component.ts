import { Component } from '@angular/core';
import {productSales,productSalesMulti} from './../../../data/products'
// import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent {
  productSales?: any[]
  productSalesMulti?: any[]

  view: [number,number] = [600, 370];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  gradient: boolean = false;
  isDoughnut: boolean = true;

  legendPosition: string = "below";

  colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };
  constructor(){ Object.assign(this, { productSales, productSalesMulti }) }
}
