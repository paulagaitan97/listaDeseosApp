import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { Lista } from '../../models/lista.model';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild( IonList ) lista: IonList;
  listas: Lista[] = [];
  @Input() terminado = true;

  
  constructor( public deseoService: DeseosService, private router: Router, private alertCtrl: AlertController) {
    this.listas = deseoService.listas;
   }
   ngOnInit() {}



  listaSeleccionada( lista: Lista ) {
    const idLista = lista.id;
    if( this.terminado ){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ idLista }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ idLista }`);
    }
    console.log(lista);
  }

  borrarLista( lista: Lista ) {

    this.deseoService.borrarLista( lista );

  }


  async editarLista( lista: Lista ) {

    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {
            console.log(data);
            if ( data.titulo.length === 0 ) {
              return;
            }

            lista.titulo = data.titulo;
            this.deseoService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();


  }

}
