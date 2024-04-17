import { Component } from '@angular/core';
import { productSalesMulti } from './../../../data/products';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  constructor() {
    Object.assign(this, { productSalesMulti });
  }

  productSalesMulti?: any[];
  view: [number, number] = [600, 370];

  // legend: boolean = true;
  // showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Products';
  yAxisLabel: string = 'Sales';
  timeline: boolean = true;

  // colorScheme = {
  //   domain: ['#704FC4', '#704FC4'],
  //   name: " ",
  //   selectable: false,
  // };

}
