import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
    export class App {

contador: number=0;
idiomaActual: 'es'|'en'='es';
mensajeAlerta: string='';

incrementarContador():void{
  this.contador++;
}

reiniciarContador():void{
  this.contador=0;
}

seleccionarIdioma(nuevoIdioma:'es'|'en'):void{
  this.idiomaActual=nuevoIdioma;
}
  clickFondoTarjeta():void {
  this.mensajeAlerta='Hiciste clic en el fondo de la tarjeta'
  }

  clickBtnHijo(evento:MouseEvent):void{
  evento.stopPropagation();

  this.mensajeAlerta='Hiciste un click en el boton interno, el padre no se entero (el fondo amarillo)';
  }

}


