import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {MainPage } from '../main/main';
import {TareasProvider} from '../../providers/tareas/tareas';
/**
 * Generated class for the FormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
  providers:[TareasProvider]
})
export class FormPage {

   private idTarea:number=0;
   private bEdit:boolean=false;
   public tarea:any;
   private alert:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public TareasProvider:TareasProvider,public Alert:AlertController) {
    this.idTarea=navParams.get('idTarea');
    this.tarea={};
    this.tarea.titulo="";
    this.tarea.descripcion="";
    this.tarea.urgente=0;
    this.alert=Alert;
  }
  submit(){
    if(!this.bEdit){
      this.TareasProvider.create(this.tarea).subscribe(res=>{
            let response=res;
            let mensaje=this.alert.create({
                title: 'Exito',
                message:response.message,
                buttons:['OK']
              });
              mensaje.present();
              this.navCtrl.push(MainPage);
          });
    }else{
        this.TareasProvider.update(this.tarea).subscribe(res=>{
                    console.log(res);
                    let response=res;
                    let mensaje=this.alert.create({
                        title: 'Exito',
                        message:response.message,
                        buttons:['OK']
                      });
                      mensaje.present();
                      this.navCtrl.push(MainPage);
                  });
    }
    
  }
  cancelar(){
    this.navCtrl.pop(FormPage);
  }
  ionViewDidLoad() {
    if(typeof this.idTarea !== 'undefined'){
      this.TareasProvider.getTareaById(this.idTarea).subscribe(tarea=>{
       this.tarea=tarea;
       this.tarea.urgente=(this.tarea===1)?true:false;
       this.bEdit=true;
      });
    }
  }

}
