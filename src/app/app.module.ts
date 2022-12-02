import { NgModule } from '@angular/core';
import { AppComponent } from './components/app.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { AnotacaoComponent } from './components/anotacao/anotacao.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ObjetoComponent } from './components/objeto/objeto.component';
import { PesquisarComponent } from './components/pesquisar/pesquisar.component';
import { TituloComponent } from './components/titulo/titulo.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ImagemComponent } from './components/imagem/imagem.component';
import { HomeComponent } from './components/home/home.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    AnotacaoComponent,
    CadastroComponent,
    ObjetoComponent,
    PesquisarComponent,
    TituloComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    ImagemComponent,
    HomeComponent,
    FormularioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ScrollingModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ScrollingModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
