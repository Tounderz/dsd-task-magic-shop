import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home-page';
import { Header } from '../../../core/components/header/header';
import { Toaster } from '../../../shared/components/ui/toaster/toaster';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomePage,
        Header,
        Toaster,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('должен создавать компонент', () => {
    expect(component).toBeTruthy();
  });

  describe('шаблон', () => {
    it('должен содержать header', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const header = compiled.querySelector('header[app-header]');
      expect(header).toBeTruthy();
    });

    it('должен содержать wrapper', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const wrapper = compiled.querySelector('.wrapper');
      expect(wrapper).toBeTruthy();
    });

    it('должен содержать router-outlet', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const routerOutlet = compiled.querySelector('router-outlet');
      expect(routerOutlet).toBeTruthy();
    });

    it('должен содержать toaster', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const toaster = compiled.querySelector('app-toaster');
      expect(toaster).toBeTruthy();
    });
  });
});
