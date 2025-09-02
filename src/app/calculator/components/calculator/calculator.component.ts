import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [ CalculatorButtonComponent ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {

  private calculatorServices = inject(CalculatorService);

  public calculatorButtons = viewChildren( CalculatorButtonComponent );

  public resulText = computed(() => this.calculatorServices.resultText());
  public subResulText = computed(() => this.calculatorServices.subResultText());
  public lastOperator = computed(() => this.calculatorServices.lastOperator());

  handleClick( key: string ){
    this.calculatorServices.constructNumber(key);
  }

  handleKeyboardEvent(event: KeyboardEvent){
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      x: '*',
      '/': '÷',
      Enter: '=',
      '=': '=',
      ',': '.',
      '.': '.',
    };
    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorButtons().forEach( button => {
        button.keyboardPressedStyle(keyValue);
    });

  }

}
