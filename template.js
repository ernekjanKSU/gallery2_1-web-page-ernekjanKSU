/** @module template
*/

module.exports = {
	render: render,
	loadDir: loadDir
}


var fs = require('fs');
var templates = {file: gallery.html};

/**	@function loadDir
 * Loads a directory of templates
 * @param {string} directory - the directory to load
 */
 function loadDir(directory){
 	dir = fs.readdirSync(directory);
 	dir.forEach(function(file){
 		var path = directory + '/' + file;
 		var stats = fs.statSync(path);
 		if(stats.isFile()){
 			templates[file] = fs. readFileSync(path).toString();
 		}
 	});
 }


/** @function render
 *	Renders a template with embedded javascript
 *	@param {string} templateName - the template to render
 *  @param {...}
 */
function render(templateName, context){
	//html = fs.readFileSync('templates/' + templateName + '.html');
	return templates[templateName].replace(/<%=(.+)%>/g, function(match, js){
		return eval("var context = " + JSON.stringify(context) + ";" + js);
	});
	//return html;
}