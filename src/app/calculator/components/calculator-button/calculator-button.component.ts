import { ChangeDetectionStrategy, Component, HostBinding, input, output, viewChild, ElementRef, signal } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    attribute: 'hola',
    'data-size': 'XL',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()'
  }
})
export class CalculatorButtonComponent {

  public isPressed = signal(false);


  //Para emitir eventos al exterior
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');


  //Para recibir datos del exterior
  public isCommand = input(false, {
    transform: ( value: boolean | string ) =>
      typeof value === 'string' ? value === '': value,
  });

  public isDoubleSize = input(false, {
    transform: ( value: boolean | string ) =>
      typeof value === 'string' ? value === '': value,
  });

  /*@HostBinding('class.is-double-size') get commandStyle() {
    return this.isDoubleSize();
  }*/

  /*@HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubleSize();
  }*/


  handleClick() {
    if( !this.contentValue()?.nativeElement ){
      return;
    }
    const value = this.contentValue()!.nativeElement.innerText.trim();
    this.onClick.emit(value);
  }

  public keyboardPressedStyle( key: string){
    if( !this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerText.trim();

    if( value !== key ) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);

  }

}
