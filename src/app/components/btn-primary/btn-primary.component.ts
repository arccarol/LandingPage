import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

type BtnVariants = "primary" | "secondary";

@Component({
  selector: 'btn-primary',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './btn-primary.component.html',
  styleUrl: './btn-primary.component.scss'
})
export class BtnPrimaryComponent {
// Recebe o valor do atributo 'btn-text' no HTML e armazena em 'btnText'
// Exemplo no HTML: <btn-primary btn-text="Enviar">
@Input("btn-text") btnText: string = "";

// Define se o botão estará desabilitado (true/false)
// Exemplo no HTML: <btn-primary [disabled]="true">
@Input() disabled: boolean = false;

// Define se o botão está em estado de carregamento
// Quando 'true', geralmente o botão mostra "Carregando..." no lugar do texto
@Input() loading: boolean = false;

// Controla a aparência (variante) do botão, como 'primary', 'secondary' etc.
// Usa um tipo personalizado BtnVariants (provavelmente um enum ou tipo definido)
@Input() variant: BtnVariants = "primary";

// Cria um evento de saída chamado 'submit' que o componente pai pode escutar
// Exemplo no HTML: <btn-primary (submit)="minhaFuncao()"> 
@Output("submit") onSubmit = new EventEmitter();

// Método chamado quando o botão for clicado
// Emite o evento 'submit' para o componente pai
submit() {
  this.onSubmit.emit();
}
}