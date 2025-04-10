import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsletterResponse } from '../interfaces/newsletter.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
// Define a URL base do endpoint da API onde os dados da newsletter serão enviados.
// Neste caso, é um servidor local rodando na porta 3000.
private endpointUrl = 'http://localhost:3000/api/newsletter';

// Injeta o serviço HttpClient no construtor para permitir fazer requisições HTTP.
// O Angular fornece HttpClient para comunicação com APIs.
constructor(private http: HttpClient) { }

// Função pública chamada `sendData` que recebe nome e email como parâmetros.
// Retorna um Observable com a resposta esperada do tipo NewsletterResponse.
sendData(name: string, email: string): Observable<NewsletterResponse> {
  // Cria um objeto com os dados a serem enviados no corpo da requisição.
  const data = { name, email };

  // Faz uma requisição POST para o endpoint da API, enviando os dados.
  // O tipo de resposta esperada é NewsletterResponse (interface ou tipo criado previamente).
  return this.http.post<NewsletterResponse>(this.endpointUrl, data);
}
}