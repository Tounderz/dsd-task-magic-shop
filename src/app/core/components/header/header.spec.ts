import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { RouterTestingModule } from '@angular/router/testing';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Header,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('должен создавать компонент', () => {
    expect(component).toBeTruthy();
  });

  it('должен иметь ссылки навигации', () => {
    expect(component.headerLinks.length).toBe(3);

    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.header-link');

    expect(links.length).toBe(3);
    expect(links[0].textContent?.trim()).toBe('Заказы');
    expect(links[1].textContent?.trim()).toBe('Зелья');
    expect(links[2].textContent?.trim()).toBe('Ингредиенты');
  });

  it('должен отображать название проекта', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const projectName = compiled.querySelector('.project-name');

    expect(projectName?.textContent?.trim()).toBe('Лавка мага');
  });

  it('должен иметь правильные пути для ссылок', () => {
    expect(component.headerLinks[0].path).toBe('');
    expect(component.headerLinks[0].label).toBe('Заказы');
    expect(component.headerLinks[0].exact).toBe(true);

    expect(component.headerLinks[1].path).toBe('/potions');
    expect(component.headerLinks[1].label).toBe('Зелья');
    expect(component.headerLinks[1].exact).toBe(false);

    expect(component.headerLinks[2].path).toBe('/ingredients');
    expect(component.headerLinks[2].label).toBe('Ингредиенты');
    expect(component.headerLinks[2].exact).toBe(false);
  });

  it('должен компилироваться без ошибок', () => {
    expect(() => {
      fixture.detectChanges();
    }).not.toThrow();
  });
});
