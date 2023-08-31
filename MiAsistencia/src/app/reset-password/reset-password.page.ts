import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage  {

  constructor(private animationCtrl: AnimationController) {}

  async animar() {
    const cuadro = document.querySelector('.repitpass,.pass');
  
    const animation: Animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('.pass,.repitpass'))
      .duration(1000) 
      .iterations(1) 
      .fromTo('opacity', '0', '1');
      
  
    await animation.play();
    }


    
  ngOnInit() {
  }
  }
  

  

