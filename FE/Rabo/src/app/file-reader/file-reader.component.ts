import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.scss']
})
export class FileReaderComponent implements OnInit {

  tableInfo: any = [];
  headerInfo: any = [];
  searchTxt: string = '';
  isFileSupported: boolean = true;
  
  constructor(private service: CommonService) {
  }

  ngOnInit() {
  }

  // ======= Convert CSV file to JSON ======== //
  convertFile(csv: any) {
    
    this.isFileSupported = true;
    const fileFormat = this.service.getFileFormat(csv.target.files[0]);
    if (fileFormat !== 'csv' && fileFormat != 'nofile') {
      this.isFileSupported = false;
      return;
    }
  
    let reader: FileReader = new FileReader();
    if (csv.target.files[0]) {
      this.tableInfo.length = 0;
      reader.readAsText(csv.target.files[0]);    
      reader.onload = (e) => {  
        let csv: any = reader.result;  
        let allTextLines = csv.split(/\n/);  
        this.headerInfo = this.service.csvToArray(allTextLines[0]);
        this.tableInfo = this.service.csvToJSON(allTextLines);
      }
    }    
  }

}
