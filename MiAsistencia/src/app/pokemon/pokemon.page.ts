import { Component, OnInit, } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PostService } from '../post.service'; //importamos nuestro service
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {

  arrayPosts: any;
  randomNumber: number = 0;
  characterData: any;
  url = 'https://pokeapi.co/api/v2/pokemon';

  constructor(
    public navCtrl: NavController,
    public postServices: PostService,
    private http: HttpClient,
    private router: Router
    
    ) { }


  getPosts() { //llamamos a la funcion getPost de nuestro servicio.

    this.randomNumber = Math.floor(Math.random() * 1010) + 1; // Genera un número aleatorio del 1 al 10 (ajusta según tus necesidades)

    // Realiza una solicitud HTTP a la API con el número aleatorio
    this.http.get(`${this.url}/${this.randomNumber}`).subscribe((data) => {
      this.characterData = data;

    });

  }

  home(){
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    this.getPosts();
  }

}
