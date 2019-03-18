import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient: HttpClient) { }

  send(obj: any): Observable<any> {
    return this.httpClient.post('/validateTransaction', obj);
  }

  // ========= Get the file extension =============
  getFileFormat(file): string {
    if (file) {
      let fileName = file.name;  
      let fileType = fileName.substring(fileName.lastIndexOf(".") + 1);
      return fileType;
    }
    return 'nofile';
  }

  // ========= Covert XML to JSON =============
  formatXmlToJSON(record) {
    let txnList = record;
    for (var i = 0; i < txnList.length; i++) {
      if (txnList[i]['@attributes']) {
          txnList[i]['reference'] = +txnList[i]['@attributes']['reference'];
      } 
      for (let key in txnList[i]) {
        let k = key.toLowerCase();
        let value = txnList[i][key];
        delete txnList[i][key];
        txnList[i][k] = value;
      }
    }
    return txnList;
  }

  // =============== Convert CSV to JSON =============
  csvToJSON(str) {
    let jsonData:any = [];
    let headers = str[0].replace(/\s+/g, '').split(','); 
    for (let i = 1; i < str.length; i++) {  
      let obj = {};
      let data = this.csvToArray(str[i]);  
      if (data.length === headers.length) {
        for (let j = 0; j < data.length; j++) {
          let key = headers[j].toLowerCase();
          obj[key] = data[j];
        }
        jsonData.push(obj);
      }
    }
    return jsonData;
  }
  
  // =========== Convert CSV to list of array values ======
  csvToArray(text) {
    let re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
    let re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
    if (!re_valid.test(text)) return null;
    let a: any = []; 
    text.replace(re_value,
        function(m0, m1, m2, m3) {
            // Remove backslash from \' in single quoted values.
            if (m1 !== undefined) {
              a.push(m1.replace(/\\'/g, "'"));
            }
            // Remove backslash from \" in double quoted values.
            else if (m2 !== undefined) {
              a.push(m2.replace(/\\"/g, '"'));
            }
            else if (m3 !== undefined) {
              a.push(m3);
            }
            return '';
        });
    // Handle special case of empty last value.
    if (/,\s*$/.test(text)) {
      a.push('');
    }
    return a;
  }
}
