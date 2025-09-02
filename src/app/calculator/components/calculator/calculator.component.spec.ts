import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { By } from '@angular/platform-browser';


// Servicio ficticio
class MockCalculatorService {

  //Simulamos el estado inicual del servicio
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('20');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('-');


  //Crear funcion ficticia para construir el numero
  public constructNumber = jasmine.createSpy('constructNumber');


}


describe('Calculator', () => {

  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;

  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent
    );
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;

    //fixture.detectChanges();
  });

  it('should create the app', () => {
    //console.log(compiled);
    expect(component).toBeTruthy();
  });

  it('should have the current getters', () => {
    expect(component.resulText()).toBe('100.00');
    expect(component.subResulText()).toBe('20');
    expect(component.lastOperator()).toBe('-');
  });

  it('should display proper calculator values', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('456');
    mockCalculatorService.lastOperator.and.returnValue('*');

    fixture.detectChanges();

    expect(compiled.querySelector('span')?.innerText).toBe('456 *');

    expect(component.resulText()).toBe('123');
    expect(component.subResulText()).toBe('456');
    expect(component.lastOperator()).toBe('*');
  });

  it('should have 19 calculator-button components', () => {
    expect(component.calculatorButtons()).toBeTruthy();   //Un valor que sea diferente de nulo
    expect(component.calculatorButtons().length).toBe(19);   //Tienen que haber 19 botones
  });

  it('should have 19 calculator-button with content projection', () => {
    /*const buttonsByDirective = fixture.debugElement.queryAll(
      By.directive(CalculatorButtonComponent)
    );*/

    const buttons = compiled.querySelectorAll('calculator-button');

    expect(buttons.length).toBe(19);

    expect(buttons[0].textContent?.trim()).toBe('C');
    expect(buttons[1].textContent?.trim()).toBe('+/-');
    expect(buttons[2].textContent?.trim()).toBe('%');
    expect(buttons[3].textContent?.trim()).toBe('÷');
  });

  it('should handle keyboard events correctly', () => {
   const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
   document.dispatchEvent( eventEnter );
   expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');

    const eventESC = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent( eventESC );
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
  });

  it('should display result text correctly', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('10');
    mockCalculatorService.lastOperator.and.returnValue('-');

    fixture.detectChanges();

    expect(component.resulText()).toBe('123');
    expect(compiled.querySelector('#sub-result')?.textContent).toContain('10 -');
  });


});
