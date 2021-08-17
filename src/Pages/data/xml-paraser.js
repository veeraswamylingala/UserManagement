
export function ShapesData(){

const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');

const parser = new xml2js.Parser();

fs.readFile('ecscadax.xml', (err, data) => {
	parser.parseString(data, (err, result) => {
		console.log(util.inspect(result, false, null, true));
		return result;
		
	});
	
});


}

export default ShapesData;