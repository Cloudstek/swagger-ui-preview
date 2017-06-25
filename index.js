const cli = require('commander');
const fs = require('fs-extra');
const path = require('path');
const express = require('express');
const swaggerParser = require('swagger-parser');
const swaggerUi = require('swagger-ui-express');
const pkg = fs.readJsonSync(path.join(__dirname, 'package.json'));

// CLI options
cli
    .version(pkg.version)
    .arguments('<file>')
    .option('-p, --port', 'Listen port');

cli.parse(process.argv);

// Port number
const listenPort = cli.port || 8080;

// Load document
if (!fs.pathExistsSync(cli.args[0])) {
    console.error('Input file could not be found.');
    process.exit(1);
}

// Initialize Express
var app = express();

// Serve parsed swagger file
app.get('/swagger.yml', function (request, response) {
    return swaggerParser.dereference(cli.args[0])
        .then(function (swaggerDoc) {
            response.send(swaggerDoc);
        });
});

// Initialize Swagger UI
app.use('/', swaggerUi.serve, swaggerUi.setup({}, false, {
    url: `http://localhost:${listenPort}/swagger.yml`
}));

// Listen
app.listen(listenPort);

console.log(`Listening on http://localhost:${listenPort}`);
