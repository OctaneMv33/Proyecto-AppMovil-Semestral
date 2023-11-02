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
    this.router.navigate(['/home'])
  }

  async animarContenido(){
    const animation: Animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('.tex'))
      .addElement(document.querySelectorAll('.lista'))
      .addElement(document.querySelectorAll('.boton'))
      .duration(1500)
      .keyframes([
        { offset: 0, opacity: 0.2, transform: 'translateX(-100%)' },
        { offset: 0.5, opacity: 1, transform: 'translateX(0%)' },
      ]);
      await animation.play()
  }

  async animarTitulo() {
    const animation: Animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('.titulo'))
      .duration(2500)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, opacity: 1, transform: 'translateX(0%)' },
        { offset: 0.5, opacity: 0.2, transform: 'translateX(100%)' },
        { offset: 0.5001, opacity: 0, transform: 'translateX(-100%)' },
        { offset: 0.52, opacity: 0.2, transform: 'translateX(-100%)' }
      ]);
    await animation.play()
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params =>{
      this.dato = params.get('data');
    });
    this.animarContenido();
    this.animarTitulo();
  }


 
}
