import { Component, OnInit } from '@angular/core';
//** */
import { PersonaService } from 'src/app/services/persona.service';
import { PersonaI } from 'src/app/model/persona.interface';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  persona : PersonaI={
    nombre: '',
    apellido:''
  };
  personaId: null;

  constructor(private route: ActivatedRoute,private personServ: PersonaService,
              private nav: NavController, private loadingctrl: LoadingController) { }
//**Cuando se cargue la página web */
  ngOnInit() {
    this.personaId= this.route.snapshot.params['id'];
    this.cargarPersona();


  }
  //** Se crea un proceso asincrono de precarga */
  async cargarPersona(){
    const loading = await this.loadingctrl.create({
      message:'Cargando...'
    });
    await loading.present();
    this.personServ.getPersona(this.personaId).subscribe(resp=>{
      loading.dismiss();
      this.persona= resp;
      console.log(resp);
    });
  }
}
