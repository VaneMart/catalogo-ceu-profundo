import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { PesquisaComponent } from './components/pesquisa/pesquisa.component';
import { HomeComponent } from './components/home/home.component';

const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'pesquisar', component: PesquisaComponent },
  { path: 'catalogar', component: CadastroComponent },
  { path: 'catalogar/:uuid', component: CadastroComponent },
  { path: 'home', component: HomeComponent, children: [
    {path: 'alterar/:uuid', redirectTo: '/catalogar/:uuid', pathMatch: 'full'}]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
