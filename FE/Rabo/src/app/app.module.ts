import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FileReaderComponent } from './file-reader/file-reader.component';
import { OrderbyPipe } from './pipes/orderby.pipe';
import { CustomFilterPipe } from './pipes/custom-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FileReaderComponent,
    OrderbyPipe,
    CustomFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
