import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";

describe('CalculatorService', () => {

  let service: CalculatorService;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  //Antes de todas pruebas
  beforeAll(() => {});

  //Antes de cada prueba
  beforeEach(() => {});

  //Después de todas las pruebas
  afterAll(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created eith default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText to "0" when C is pressed', () => {
    service.resultText.set('123');
    service.resultText.set('456');
    service.resultText.set('*');

    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

  });

  it('should update resultText with number input', () => {
    service.constructNumber('1');
    expect(service.resultText()).toBe('1');

    service.constructNumber('2');
    expect(service.resultText()).toBe('12');
  });

  it('should handle operators correctly', () => {
    service.constructNumber('1');
    service.constructNumber('+');

    expect(service.lastOperator()).toBe('+');
    expect(service.subResultText()).toBe('1');
    expect(service.resultText()).toBe('0');
  });

  it('should calculate result correctly for addition', () => {
    service.constructNumber('5');
    service.constructNumber('+');
    service.constructNumber('3');
    service.constructNumber('=');

    expect(service.resultText()).toBe('8');
  });

  it('should calculate result correctly for subtraction', () => {
    service.constructNumber('9');
    service.constructNumber('-');
    service.constructNumber('1');
    service.constructNumber('=');

    expect(service.resultText()).toBe('8');
  });

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('9');
    service.constructNumber('x');
    service.constructNumber('7');
    service.constructNumber('=');

    expect(service.resultText()).toBe('63');
  });

  it('should calculate result correctly for division', () => {
    service.constructNumber('9');
    service.constructNumber('0');
    service.constructNumber('/');
    service.constructNumber('3');
    service.constructNumber('=');

    expect(service.resultText()).toBe('30');
  });

  it('should handle decimal point correctly', () => {
    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('5');

    expect(service.resultText()).toBe('1.5');
    service.constructNumber('.');
    expect(service.resultText()).toBe('1.5');
  });


  it('should handle decimal point correctly starting with zero', () => {
    service.constructNumber('0');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('0');

    expect(service.resultText()).toBe('0.0');

  });

  it('should handle sign change correctly', () => {
    service.constructNumber('9');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('-9');

    service.constructNumber('+/-');
    expect(service.resultText()).toBe('9');

  });

  it('should handle backspace correctly', () => {
    service.resultText.set('123');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('12');

    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('1');

    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle max length correctly', () => {
    for( let i = 0; i < 10; i++ ) {
      service.constructNumber('1');
    }
    expect(service.resultText().length).toBe(10);

    service.constructNumber('1');
    expect(service.resultText().length).toBe(10);
  });



});
