import { CustomFilterPipe } from './custom-filter.pipe';

describe('CustomFilterPipe', () => {

  const records = [{
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

  it('create an instance', () => {
    const pipe = new CustomFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('Check whether able to filter the record with issue count = 5', () => {
    const pipe = new CustomFilterPipe();
    expect(pipe.transform(records, ['Issuecount', 5])).toEqual([{ Firstname: 'Theo', Surname: 'Jansen', Issuecount: '5', Dateofbirth: '1978-01-02T00:00:00' }]);
  });

  it('Check whether able to filter empty array, when issue count does not match', () => {
    const pipe = new CustomFilterPipe();
    expect(pipe.transform(records, ['Issuecount', 100])).toEqual([]);
  });

   it('Check whether able to filter the record with issue count = 1', () => {
    const pipe = new CustomFilterPipe();
    expect(pipe.transform(records, ['Issuecount', 1])).toEqual([{Firstname: "Petra", Surname: "Boersma", Issuecount: "1", Dateofbirth: "2001-04-20T00:00:00" }]);
  });

});
