import { Component, OnInit, } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PostService } from '../servicios/post.service'; //importamos nuestro service
import { Router } from '@angular/router';



@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {
  
  characterData: any;

  constructor(
    public navCtrl: NavController,
    public postServices: PostService,
    
    ) { }


  generarPokemon() { //llamamos a la funcion getPost de nuestro servicio.
    this.postServices.getPosts().subscribe(data => {
      this.characterData = data;
      console.log(this.characterData);
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.generarPokemon();
  }

}
