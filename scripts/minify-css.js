const fs = require("fs");
const path = require("path");

// Paths
const inputFile = path.join(__dirname, "../as-slider.css");
const outputFile = path.join(__dirname, "../dist/as-slider.min.css");

// Read the CSS file
const css = fs.readFileSync(inputFile, "utf8");

// Absurdly simple minification
const minifiedCSS = css
	.replace(/\s+/g, " ") // Collapse spaces
	.replace(/\/\*.*?\*\//g, "") // Remove comments
	.replace(/\s*{\s*/g, "{") // Remove spaces before/after {
	.replace(/\s*}\s*/g, "}") // Remove spaces before/after }
	.replace(/\s*:\s*/g, ":") // Remove spaces before/after :
	.replace(/\s*;\s*/g, ";") // Remove spaces before/after ;
	.replace(/;}/g, "}"); // Remove trailing semicolon

// Ensure dist folder exists
fs.mkdirSync(path.dirname(outputFile), { recursive: true });

// Write minified CSS
fs.writeFileSync(outputFile, minifiedCSS);

// console.log(`Minified CSS saved to: ${outputFile}`);