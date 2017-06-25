# Swagger UI Preview

Easiest way to preview your swagger files with swagger-ui. Uses [swagger-parser](https://www.npmjs.com/package/swagger-parser) under the hood to parse swagger files and feed them to swagger-ui.

## Installation

```bash
npm install -g swagger-ui-preview
```

## Usage

Run swagger-ui-preview with the path to your swagger file (JSON or YAML) and point your browser to http://localhost:8080.

```bash
swagger-ui-preview /path/to/your/swagger_file.yml
```

In case you want to run swagger-ui-preview on a different port:

```bash
swagger-ui-preview -p 3000 /path/to/your/swagger_file.yml
```

## Related packages

* [swagger-parser](https://www.npmjs.com/package/swagger-parser)
* [swagger-ui](https://www.npmjs.com/package/swagger-ui)
