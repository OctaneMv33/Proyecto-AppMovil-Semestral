import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})

export class ResetPasswordPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private animationCtrl: AnimationController) {}

  ngOnInit() {
  
  }

  async animar() {
    const elementosAnimar = document.querySelectorAll('.repitpass, .pass, .titulo');

    const animation: Animation = this.animationCtrl.create()
      .addElement(elementosAnimar)
      .duration(1000)
      .iterations(2)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateX(0)', 'translateX(50px)');

    await animation.play();
  }

  limpiarCampos() {
    this.email = '';
    this.password = '';
  }
}
  



  
   