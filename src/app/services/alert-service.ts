import { AlertController } from '@ionic/angular/standalone';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
    
  // forma moderna de inyectar dependencias sin constructor
  private alertController: AlertController = inject(AlertController);

  async alertMessage(header: string, message: string) {

    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    // el present muestra la alerta cuando es llamada la función
    await alert.present();
  }

  async alertConfirm(
    header: string, 
    message: string, 
    functionOk: Function, 
    cancelText: string = "Cancelar", 
    confirmText: string = "Aceptar") {

        const alert = await this.alertController.create({
          header: header,
          message: message,
          buttons: [
            {
              text: cancelText,
              role: 'cancel',
            },
            {
              text: confirmText,
              role: 'confirm',
              handler: () => {
                functionOk();
              },
            },
          ],
        });

        await alert.present();
  }
}
