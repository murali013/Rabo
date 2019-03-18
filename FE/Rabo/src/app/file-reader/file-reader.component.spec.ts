import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileReaderComponent } from './file-reader.component';
import { FormsModule } from '@angular/forms';
import { CustomFilterPipe } from '../pipes/custom-filter.pipe';

describe('FileReaderComponent', () => {
  let component: FileReaderComponent;
  let fixture: ComponentFixture<FileReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileReaderComponent, CustomFilterPipe ],
       imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileReaderComponent);
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


   it('Check whether table is displayed or not', () => {  
    // component.headerInfo = ["Reference",	"AccountNumber",	"Description",	"Start Balance",	"Mutation",	"End Balance"];  
    component.headerInfo = ["First Name",	"Sur Name",	"Issue Count",	"DOB"];  
    component.tableInfo = [{
      "Firstname": "Theo",
      "Surname": "Jansen",
      "Issuecount": "5",
      "Dateofbirth": "1978-01-02T00:00:00"
    }, {
      "Firstname": "Fiona",
      "Surname": "de Vries",
      "Issuecount": "7",
      "Dateofbirth": "1950-11-12T00:00:00"
    }, {
      "Firstname": "Petra",
      "Surname": "Boersma",
      "Issuecount": "1",
      "Dateofbirth": "2001-04-20T00:00:00"
    }];
    fixture.detectChanges();
    expect(component.tableInfo.length).toBe(3);
  });

  

  
});
