import { Injectable } from '@angular/core';
//*Librerías **//
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import {PersonaI} from '../model/persona.interface';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private personaCollection: AngularFirestoreCollection<PersonaI>;
  private personas:Observable<PersonaI[]>;

  constructor(db: AngularFirestore) {
    this.personaCollection=db.collection<PersonaI>('persona');
    this.personas=this.personaCollection.snapshotChanges().pipe(
      map(
        actions =>{
          return actions.map(a=>{
            const id=a.payload.doc.id;
            const dato= a.payload.doc.data();
            return {id, ...dato}
          });
        }));
  }
//*Métodos CRUD**//

//*Método que lista todas las personas//
getPersonas(){
  return this.personas;
}
//**Método buscar persona por ID */
getPersona(id:string){
  return this.personaCollection.doc<PersonaI>(id).valueChanges();
}
//**Método que almacena una persona */
addPersona(persona: PersonaI){
  return this.personaCollection.add(persona);
}
}
