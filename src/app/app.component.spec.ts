import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {


  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    //El componente hay que  montarlo en un TestBed
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should be 3", () => {
    // A - Arrange (Arreglar) -- Preparamos el objeto de prueba
    const num1 = -2;
    const num2 = 5;

    // A - Act (Actuar)  --- Actuamos
    const result = num1 + num2;

    // A - Assert (Afirmar) --- Verificamos el comportamiento esperado mediante asersiones
    expect(result).toBe(3);

  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  //Evaluamos en el DOM que exista el router-outlet si deben haber más entonces usamos querySelectorAll
  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should rebnder router-outlet wrapped with css classes', () => {
    const divElement = compiled.querySelector('div');

    const mustHaveClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ');

    const divClasses = divElement?.className.split(' ');

    expect(divElement).not.toBeNull();

    mustHaveClasses.forEach((className) => {
      expect(divClasses).toContain(className);
    });
  });

  it("should contain  the 'buy me a beer' link", () => {
    const anchorElement =  compiled.querySelector('a');

    expect(anchorElement).not.toBeNull();
    expect(anchorElement?.title).toBe('Buy me a beer');
    expect(anchorElement?.href).toBe(
      'https://www.buymeacoffee.com/scottwindon'
    );
    expect(anchorElement?.getAttribute('href')).toBe(
      'https://www.buymeacoffee.com/scottwindon'
    );
  });





});
