import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {

  uuid?: string;
  titulo!: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {  
    this.activatedRoute.params.subscribe(params => {
      this.uuid = params['uuid'];
      this.titulo = this.uuid? "Alterar objeto" : "Novo objeto";
    });
  }
}
