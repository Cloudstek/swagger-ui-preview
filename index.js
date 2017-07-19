const cli = require('commander');
const fs = require('fs-extra');
const path = require('path');
const express = require('express');
const swaggerParser = require('swagger-parser');
const swaggerUi = require('swagger-ui-express');
const pkg = fs.readJsonSync(path.join(__dirname, 'package.json'));

var inputFile = null;

// CLI options
cli
    .version(pkg.version)
    .arguments('<file>')
    .option('-p, --port <port>', 'Listen port', /^[0-9]+$/, 8080)
    .action(function (file) {
        inputFile = file;
    });

cli.parse(process.argv);

// Load document
if (!fs.pathExistsSync(inputFile)) {
    console.error('Input file could not be found.');
    process.exit(1);
}

// Initialize Express
var app = express();

// Initialize Swagger UI
swaggerParser.dereference(inputFile)
    .then(function (swaggerDoc) {
        app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc, false, {
            tagsSorter: 'alpha',
            operationsSorter: 'alpha'
        }));

        // Listen
        app.listen(cli.port);
        console.log(`Listening on http://localhost:${cli.port}`);
    });
