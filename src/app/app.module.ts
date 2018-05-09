import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { AppComponent } from './app.component';
import { PainterService } from './painter.service';
import { MatCalendar } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [PainterService],
  bootstrap: [AppComponent],
  entryComponents: [MatCalendar]
})
export class AppModule { }
