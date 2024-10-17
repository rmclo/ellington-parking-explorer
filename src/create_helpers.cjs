#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get the command line arguments
const args = process.argv.slice(1);
const filePath = path.resolve(__dirname, args[1]);

// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
if (err) {
    console.error('Error reading file:', err);
    return;
}

const regex = /grid-template-areas:(.*?)}/gms;
const matches = data.matchAll(regex);

let style_js = "";
let element_html = "";
let pillar = "";

for (const match of matches) {
	let m = match[0];
	m = m.replace(/\n/g, " ");
	m = m.replace(/\t/g, " ");
	m = m.replace(/\./g, " ");
	m = m.replace(/\"/g, " ");
	m = m.replace(/}/g, " ");
	m = m.replace(/grid-template-areas:/g, " ");
		let tokens = [...new Set(m.split(' '))];
		tokens.forEach( (item) => {
			if (item != "") {
				style_js += "." + item + " { grid-area: " + item + "; }\n";
				if (item.matchAll(/^pillar/g)) {
					pillar = "pillar";
				} else { pillar = ""; }
				element_html += "<div className=\"" + item + " " + pillar + " cell\">" + item + "</div>\n";
			}
		});
console.log(style_js);
console.log(element_html);
}
});

//
/*    // Write to the file
    fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log('File has been written successfully.');
    });
} else {
    console.log('Unknown command. Use "read" or "write".');
}*/

