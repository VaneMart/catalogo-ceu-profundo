export class Anotacao {

    id?: number;
    uuid?: string;
    posicao: number;
    conteudo?: string;

    constructor(posicao: number) {
        this.posicao = posicao;
    }
}