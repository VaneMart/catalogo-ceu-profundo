import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotacaoComponent } from './anotacao.component';

describe('AnotacaoComponent', () => {
  let component: AnotacaoComponent;
  let fixture: ComponentFixture<AnotacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnotacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
