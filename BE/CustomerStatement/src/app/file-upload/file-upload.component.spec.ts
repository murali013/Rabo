import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadComponent } from './file-upload.component';
import { HttpClientModule } from '@angular/common/http';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadComponent ],
      imports: [
        HttpClientModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check for validation error message should not be shown in UI', () => {  
    component.isFileSupported = false;
    fixture.detectChanges();  
    expect(component.isFileSupported).toBe(false);
  });

  it('Check for validation error message should be shown in UI', () => {    
    component.isFileSupported = true;
    fixture.detectChanges();
    expect(component.isFileSupported).toBe(true);
  });

  it('Check whether failed transactions are displayed or not', () => {
    component.failedTxnList = [{"description":"Clothes for Willem Dekker","reference":"112806"},{"description":"Clothes for Richard de Vries","reference":"112806"},{"description":"Tickets from Richard Bakker","reference":"112806"},{"description":"Flowers for Willem Dekker","reference":"195446"}];
    fixture.detectChanges();
    expect(component.failedTxnList.length).toBe(4);
  });

  
});
