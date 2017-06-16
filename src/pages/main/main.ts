import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormPage } from '../form/form';
import { AlertController } from 'ionic-angular';
import {TareasProvider} from '../../providers/tareas/tareas';


@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers:[TareasProvider]
})
export class MainPage {

  public tareas:any;
  private alert
  constructor(public navCtrl: NavController, public navParams: NavParams,public TareasProvider:TareasProvider,public Alert:AlertController) {
    this.alert=Alert;
  }
   
  addTarea(){
    this.navCtrl.push(FormPage);
  }
  editTarea(idTarea){
    this.navCtrl.push(FormPage,{idTarea:idTarea});
  }
  deleteTarea(idTarea){
    let ventana=this.alert.create({
      title: 'Eliminar',
      message: '¿Desea eliminar a tarea de forma permanete?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
             this.TareasProvider.deleteTareaById(idTarea).subscribe(res=>{
               let response=res;
               let mensaje=this.alert.create({
                  title: 'Exito',
                  message:response.message,
                  buttons:['OK']
                });
                mensaje.present();
                this.ionViewDidLoad() ;              
             });
          }
        }
      ]
    });
    ventana.present();
  }
  
  ionViewDidLoad() {
   this.TareasProvider.getTareas().subscribe(tareas=>{
     this.tareas=tareas;
   });
  }
  
}
