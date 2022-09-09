/*
 *  heroku_prep.js
 *  Prepares a default angular-7 package.js file so it so a Angular App can be served on Heroku
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
app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);`;

//  Read in the package.json

package_file.dependencies["@angular/cli"] = package_file.devDependencies["@angular/cli"];
package_file.dependencies["@angular/compiler-cli"] = package_file.devDependencies["@angular/compiler-cli"];
package_file.dependencies["typescript"]= package_file.devDependencies["typescript"];
package_file.scripts["build"] = "node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build %config%";
package_file["engines"] = {"node":"16.x", "npm":"8.x"};
package_file.devDependencies["enhanced-resolve"]="^5.8.0";
package_file.dependencies["express"] = "^4.17.1";
package_file.dependencies["path"] = "^0.12.7";
package_file.scripts["start"] = "node server.js";

// Output the files

writeOutTheFile('server.js', server_template);
writeOutTheFile('package.json_2', JSON.stringify(package_file, null, 2));






