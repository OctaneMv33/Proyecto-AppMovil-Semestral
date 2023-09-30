import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  randomNumber: number = 0;
  characterData: any;
  url = 'https://pokeapi.co/api/v2/pokemon';

  constructor(public http: HttpClient) { }

  getPosts() {
    this.randomNumber = Math.floor(Math.random() * 10) + 1;
    
    return new Promise(resolve => {
      
      this.http.get(`${this.url}/${this.randomNumber}`).subscribe((data) => {
        this.characterData = data;
      }, error => {
        console.log(error);
      });
    });
  }



}

