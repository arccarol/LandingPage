import { Component, signal } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsletterService } from '../../services/newsletter.service';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'newsletter-form',
  standalone: true,
  imports: [
    BtnPrimaryComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    NewsletterService
  ],
  templateUrl: './newsletter-form.component.html',
  styleUrl: './newsletter-form.component.scss'
})
export class NewsletterFormComponent {
  // Criação do formulário reativo
  newsletterForm!: FormGroup;

  // Signal do Angular para controlar o estado de carregamento (true/false)
  loading = signal(false);

  // Mensagem a ser exibida ao usuário após o envio
  mensagem: string = '';

  // Construtor: inicializa o formulário e o serviço de newsletter
  constructor(private service: NewsletterService) {
    this.newsletterForm = new FormGroup({
      name: new FormControl('', [Validators.required]), // campo nome obrigatório
      email: new FormControl('', [Validators.required, Validators.email]) // campo email obrigatório e com validação de formato
    });
  }

  // Método chamado ao enviar o formulário
  onSubmit() {
    const minLoadingTime = 1500; // tempo mínimo de "carregando": 1.5 segundos
    const startTime = Date.now(); // marca o tempo em que o envio começou
    this.loading.set(true); // ativa o modo de carregamento (usado no botão)

    // Verifica se o formulário está válido antes de enviar os dados
    if (this.newsletterForm.valid) {
      // Envia os dados para o serviço
      this.service.sendData(
        this.newsletterForm.value.name,
        this.newsletterForm.value.email
      ).subscribe({
        next: (response) => {
          // Calcula quanto tempo passou desde o envio
          const elapsed = Date.now() - startTime;
          // Garante que o carregando fique visível por pelo menos 1.5s
          const delay = Math.max(minLoadingTime - elapsed, 0);

          // Aguarda o tempo restante (se necessário) antes de continuar
          setTimeout(() => {
            this.mensagem = response.message; // mostra mensagem de sucesso
            this.newsletterForm.reset(); // limpa o formulário
            this.loading.set(false); // desativa o modo de carregamento

            // Após 3 segundos, esconde a mensagem
            setTimeout(() => {
              this.mensagem = '';
            }, 3000);
          }, delay);
        },
        error: () => {
          const elapsed = Date.now() - startTime;
          const delay = Math.max(minLoadingTime - elapsed, 0);

          // Se der erro, espera o tempo mínimo antes de mostrar o erro
          setTimeout(() => {
            this.mensagem = 'Erro ao enviar inscrição. Tente novamente.'; // mostra erro
            this.loading.set(false); // desativa o carregamento

            // Esconde a mensagem de erro depois de 3 segundos
            setTimeout(() => {
              this.mensagem = '';
            }, 3000);
          }, delay);
        }
      });
    }
  }
}