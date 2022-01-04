import { NgModule } from '@angular/core';

// Modulos
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';

import { GifsModule } from './gifs/gifs.module';
import { SharedModule } from './shared/shared.module';

//Componentes
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    GifsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
