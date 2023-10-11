import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut ,sendPasswordResetEmail } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private auth: Auth,private toastController: ToastController) { }

  login({email, password}: any){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(){
    return signOut(this.auth);
  }



  async resetpassword(email:string):Promise<void>{
    try{
      await sendPasswordResetEmail(this.auth, email);
    }
    catch(error){console.log(error)}
  }
 
}

 
  


