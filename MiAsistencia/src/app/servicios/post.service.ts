import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  randomNumber: number = 0;
  url = 'https://pokeapi.co/api/v2/pokemon';

  constructor(public http: HttpClient) { }

  getPosts(): Observable<any>{
    this.randomNumber = Math.floor(Math.random() * 1010) + 1;
    return this.http.get(`${this.url}/${this.randomNumber}`);
  }



}

