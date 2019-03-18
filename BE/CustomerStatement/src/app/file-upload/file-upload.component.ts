import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  postJSON:any = [];
  failedTxnList: any = [];
  isFileSupported:boolean = true;
  isFileUploaded:boolean = false;
  constructor(private service: CommonService, private ngxXml2jsonService: NgxXml2jsonService) { }

  ngOnInit() {
  }

  // ============= Send data to server ====================//
  submit() {
    this.service.send({transactions : this.postJSON}).subscribe((data) => {
      if (data) {
        this.isFileUploaded = true;
        this.failedTxnList = data.failedTxn;
        console.log(JSON.stringify(data.failedTxn));
      }          
    });
  }  

  // ======= Convert CSV/XML file to JSON & post the data ======== //
  convertFile(fileObj: any) {

    this.isFileSupported = true;
    let supported = this.service.getFileFormat(fileObj.target.files[0]);
    if ((supported !== 'csv' && supported !== 'xml') && supported !== 'nofile') {
      this.isFileSupported = false;
      this.isFileUploaded = false;
      return;
    }
  
    let reader: FileReader = new FileReader();
    if (fileObj.target.files[0]) {
      this.postJSON.length = 0;
      reader.readAsText(fileObj.target.files[0]);    
      reader.onload = (e) => {  
        let fileContent: any = reader.result;
        if (supported === 'csv')  {
          let allTextLines = fileContent.split(/\n/);  
          this.postJSON = this.service.csvToJSON(allTextLines);
        } else if (supported === 'xml') {
          const parser = new DOMParser();
          const xml = parser.parseFromString(fileContent, 'text/xml');
          const obj = this.ngxXml2jsonService.xmlToJson(xml);
          this.postJSON = this.service.formatXmlToJSON(obj['records']['record']);
        }      
        this.submit();          
      }
    }    

  }

}
