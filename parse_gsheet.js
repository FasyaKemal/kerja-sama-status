const fs = require('fs');
const https = require('https');
const xlsx = require('xlsx');

const url = 'https://docs.google.com/spreadsheets/d/1MRW_518UH5wbHu12ROfY_PgazQnh4CXODr9jOGdHDro/export?format=xlsx';
const file = fs.createWriteStream('/tmp/sheet.xlsx');

https.get(url, function(response) {
  if (response.statusCode === 302 || response.statusCode === 301) {
    https.get(response.headers.location, function(res) {
      res.pipe(file);
      file.on('finish', function() {
        file.close(() => {
          const workbook = xlsx.readFile('/tmp/sheet.xlsx');
          const sheetNames = workbook.SheetNames;
          console.log("Sheets:", sheetNames);
          
          sheetNames.forEach(name => {
             const data = xlsx.utils.sheet_to_json(workbook.Sheets[name]);
             console.log("Sheet:", name, "Rows:", data.length);
             if (data.length > 0) {
                 console.log("First row:", data[0]);
             }
             fs.writeFileSync('/tmp/' + name + '.json', JSON.stringify(data, null, 2));
          });
        });
      });
    });
  } else {
    response.pipe(file);
    file.on('finish', function() {
      file.close(() => {
        const workbook = xlsx.readFile('/tmp/sheet.xlsx');
        console.log(workbook.SheetNames);
      });
    });
  }
});
