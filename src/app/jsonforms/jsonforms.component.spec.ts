import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonformsComponent } from './jsonforms.component';

describe('JsonformsComponent', () => {
  let component: JsonformsComponent;
  let fixture: ComponentFixture<JsonformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonformsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JsonformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
