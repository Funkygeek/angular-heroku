# heruko-package

This node application prepares an Angular-7 application to be able to be used on the 
Heroku environmnet.

### Assumptions
It is assumed your package already has 

    npm install @angular/cli@latest @angular/compiler-cli --save-dev
    
### What this application does

* Copies `@angular/cli` and `@angular/compiler-cli` from `devDependencies` to `dependencies`
* Adds `"postinstall": "ng build --aot -prod"` to `scripts`
* Adds Node and NPM engines
      
      "engines": {
        "node": "6.11.0",
        "npm": "3.10.10"
      }
      
* Copies `"typescript"` from `devDependencies` to `dependencies`
* Install `install enhanced-resolve@3.3.0`
* Install Express server with `npm install express path --save`
* Creates the `server.js` file with the correct dist directory
* Change the `"start"` command to `node server.js`

## References
* https://medium.com/@hellotunmbi/how-to-deploy-angular-application-to-heroku-1d56e09c5147
