# angular-heroku

This node application prepares an Angular application to be able to be used on the 
Heroku environment.

### Assumptions
It is assumed your package already has 

    npm install @angular/cli@latest @angular/compiler-cli --save-dev
    
### What this application does

* Copies `@angular/cli` and `@angular/compiler-cli` from `devDependencies` to `dependencies`
* Adds `"postinstall": "ng build --aot -prod"` to `scripts`
* Adds Node and NPM engines
      
      "engines":{
            "node":"11.9.0", 
            "npm":"6.11.3"
      };
      
* Copies `"typescript"` from `devDependencies` to `dependencies`
* Install `install enhanced-resolve@4.1.1`
* Install Express server with `npm install express path --save`
* Creates the `server.js` file with the correct dist directory
* Change the `"start"` command to `node server.js`

## References
* https://medium.com/@hellotunmbi/how-to-deploy-angular-application-to-heroku-1d56e09c5147
