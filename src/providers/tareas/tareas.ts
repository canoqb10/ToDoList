import { Injectable } from '@angular/core';
//import { Http, RequestOptions,Headers } from '@angular/http';
import { Http } from '@angular/http';



import 'rxjs/add/operator/map';

/*
  Generated class for the TareasProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TareasProvider {

  private urlApI='/tareasApi/';
//  private alert:any; 
  constructor(public http: Http) {
    console.log('Hello TareasProvider Provider');
   
  }
  
  getTareas(){
    return this.http.get(this.urlApI+'read').map(res=>res.json());
    //this.http.get(this.urlApI+'read').map(res=>res.json()).subscribe(data=>{
     // console.log(data)
    //});
  }
  getTareaById(id){
    return this.http.get(this.urlApI+'read_by_id/id/'+id).map(res=>res.json());
  }
  deleteTareaById(id){
    return this.http.get(this.urlApI+'delete/id/'+id).map(res=>res.json());
  }
  create(data){
    let formData= new FormData();

    formData.append('titulo',data.titulo);
    formData.append('descripcion',data.descripcion);
    formData.append('urgente',data.urgente);
    
    //------ya detecta el header el http
    //let headers = new Headers({ 'Content-Type': undefined });
    //let options = new RequestOptions({ headers: headers });
    return this.http.post(this.urlApI+'create',formData).map(res=>res.json());

     /*this.http.post(this.urlApI+'create',formData).subscribe(res=>{
       let response=res.json();
      
       let mensaje=this.alert.create({
          title: 'Exito',
          message: response.message,
          buttons:['Aceptar']
        });
        mensaje.present();
        
     });*/
  }
  update(data){
    let formData= new FormData();

    formData.append('id',data.id);
    formData.append('titulo',data.titulo);
    formData.append('descripcion',data.descripcion);
    formData.append('urgente',data.urgente);
    
    return this.http.post(this.urlApI+'update',formData).map(res=>res.json());
  }
}
