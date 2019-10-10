/*
 *  heroku_prep.js
 *  Prepares a default angular-8 package.js file so it so a Ionic App can be served on Heroku
 *
 */

const package_file = require('./package');
const fs = require('fs');

const writeOutTheFile = (filename, data) => {
    fs.writeFile(filename, data, (err) =>{
        if(err) {
            return console.log(err);
        }
        console.log(`The ${filename} was saved!`);
    });
};



const app_name = package_file.name;
const server_template = `
//Install express server
const express = require('express');
const path = require('path');
const app = express();
// Serve only the static files from the dist directory
app.use(express.static(__dirname + '/www'));
app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/www/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);`;

//  Read in the package.json

package_file.dependencies["@angular/cli"] = package_file.devDependencies["@angular/cli"];
package_file.dependencies["@angular/compiler-cli"] = package_file.devDependencies["@angular/compiler-cli"];
package_file.dependencies["typescript"]= package_file.devDependencies["typescript"];
package_file.dependencies["@angular-devkit/architect"] = package_file.devDependencies["@angular-devkit/architect"]
package_file.dependencies["@angular-devkit/build-angular"] = package_file.devDependencies["@angular-devkit/build-angular"]
package_file.dependencies["@angular-devkit/core"] = package_file.devDependencies["@angular-devkit/core"]
package_file.dependencies["@angular-devkit/schematics"] = package_file.devDependencies["@angular-devkit/schematics"]
package_file.dependencies["@angular/compiler"] = package_file.devDependencies["@angular/compiler"]
package_file.dependencies["@angular/language-service"] = package_file.devDependencies["@angular/language-service"]
package_file.dependencies["@ionic/angular-toolkit"] = package_file.devDependencies["@ionic/angular-toolkit"] 
 
    
package_file.scripts["postinstall"] = "ng build --aot --prod";
package_file["engines"] = {"node":"11.9.0", "npm":"6.11.3"};
package_file.devDependencies["enhanced-resolve"]="4.1.1";
package_file.dependencies["express"] = "^4.17.1";
package_file.dependencies["path"] = "^0.12.7";
package_file.scripts["start"] = "node server.js";

// Output the files

writeOutTheFile('server.js', server_template);
writeOutTheFile('package.json_2', JSON.stringify(package_file, null, 2));
