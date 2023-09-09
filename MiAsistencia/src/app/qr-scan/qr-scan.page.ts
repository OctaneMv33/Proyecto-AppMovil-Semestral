import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.page.html',
  styleUrls: ['./qr-scan.page.scss'],
})
export class QrScanPage implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private animationCtrl: AnimationController) { }

  dato: string | null = null;

  //Solo para devolvernos desde qr-scan page a home presionando un botón. Luego de la presentación y dependiendo de lo que pidan, tendremos que quitarlo
  volverHome(){
    this.router.navigate(['/home', this.dato])
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params =>{
      this.dato = params.get('data');
    });
  }

}
