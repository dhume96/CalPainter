import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  Inject,
  ViewContainerRef
} from '@angular/core';
import { PainterService } from './painter.service';
import { MatCalendar } from '@angular/material/datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('dateInput') dateInput: ElementRef;
  @ViewChild('numberDaysInput') numberDaysInput: ElementRef;
  @ViewChild('localeInput') localeInput: ElementRef;
  @ViewChild('paintButton') paintButton: ElementRef;
  @ViewChild('container', {read: ViewContainerRef}) viewContainer: ViewContainerRef;
  service: PainterService

  constructor(@Inject(PainterService) service, 
              @Inject(ViewContainerRef) viewContainerRef) {
    this.service = service;
  }

  ngOnInit() {
    this.service.setRootViewContainerRef(this.viewContainer)
    this.dateInput.nativeElement.value = new Date().toJSON().substring(0, 10);
  }

  paintIt() {
    let minDate = this.stringToDate(this.dateInput.nativeElement.value);
    let daysToAdd = parseInt(this.numberDaysInput.nativeElement.value) - 1;

    this.addCalendars(minDate);
  }

  addCalendars(initialDate: Date) {
    this.service.clear();
    
    let remainingDays = parseInt(this.numberDaysInput.nativeElement.value);
    let currentMonth = initialDate.getMonth();
    let currentYear = initialDate.getFullYear();
    
    while (remainingDays > 0) {
      let firstDay = (initialDate.getMonth() == currentMonth && initialDate.getFullYear() == currentYear) ? initialDate.getDate() : 1;
      let lastDay = (firstDay + remainingDays) >= this.daysInMonth(currentMonth, currentYear) ? this.daysInMonth(currentMonth, currentYear) : (firstDay + (remainingDays - 1));
      let minDate = new Date(currentYear, currentMonth, firstDay);
      let maxDate = new Date(currentYear, currentMonth, lastDay);

      this.service.addDynamicComponent(minDate, maxDate);

      remainingDays -= lastDay - firstDay + 1;
      if (currentMonth == 12) currentYear ++;
      currentMonth = currentMonth == 12 ? 1 : currentMonth + 1;
    }
  }

  daysInMonth(month: number, year: number) {
    return new Date(year, month+1, 0).getDate();
  }

  stringToDate(date: string) {
    let info: Array<number> = date.split('-').map(num => {
      return parseInt(num, 10);
    });
    return new Date(info[0], info[1]-1, info[2]);
  }
}
