import { Component } from '@angular/core';
import { Mesas } from "./mesas/mesas";
import { Sillas } from "./sillas/sillas";
import { Mantel } from "./mantel/mantel";

@Component({
  selector: 'app-decorado',
  imports: [Mesas, Sillas, Mantel],
  templateUrl: './decorado.html',
  styleUrl: './decorado.css',
})
export class Decorado {

}
