import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class Dialog {

  texto=input<string>('Estás seguro del proceso');

  confirm=output<boolean>();

  onYes(){
    this.confirm.emit(true);
  }

  onNo(){
    this.confirm.emit(false);
  }
}
