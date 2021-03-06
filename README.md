# Simulado
A simple mockserver for testing with nodejs

[![Circle CI](https://circleci.com/gh/ldabiralai/simulado.svg?style=svg)](https://circleci.com/gh/ldabiralai/simulado)

## How to use
### Install
    npm install simulado
### Start
```bash
# If you have simulado installed gloabally run
simulado
# otherwise
./node_modules/simulado/bin/simulado
```
### Require
    var Simulado = require('simulado');
### Mock
```path``` is mandatory, without it Simulado will not mock anything.

```status``` defaults to ```200``` if no status is provided.

```headers``` defaults to ```{}``` if no headers are provided.

```response``` will respond with ```{}``` if no response is provided, otherwise it will return what you give it.

```method``` defaults to ```GET``` if no method is provided. Possible values are ```GET``` ```POST``` ```PUT``` ```DELETE```

```timeout``` defaults to ```0``` so there will be no delay, accepts seconds. If it's specified, simulado will wait and then send a response.

The ```callback``` will be called once Simulado has finished mocking the endpoint. You should probably put the rest of your step in a function here.
```javascript
Simulado.mock({
  path: '/account/devices',
  status: 401,
  headers: {"Content-Type": 'application/json'},
  response: {
    id: 123,
    type: "MOBILE",
    name: "My work phone"
  }
}, callback)
```
##### Wildcards
```javascript
Simulado.mock({
  path: '/account/*',
  status: 200,
  headers: {"Content-Type": 'application/json'},
  response: {
    id: 123,
    type: "MOBILE",
    name: "My work phone"
  }
}, callback)
```
<code>GET localhost.com/account/path-here => OK 200</code>

### Getting the last request
You can retrive the request made to an endpoint with ```Simulado.lastRequest(httpMethod, path)```
```javascript
Simulado.lastRequest('POST', '/postingPath', function(err, lastRequestMade) {
  lastRequestMade.headers // => {"Content-Type": "application/json"}
  lastRequestMade.body // => {"name": "simulado"}

  // http://localhost:7000/postingPath?paramName=value
  lastRequestMade.params // => {"paramName": "value"}
})

```
or you can make a request to ```http://localhost:7000/lastRequest``` with two headers (method and path), which will respond with the last request as JSON.
Example (using superagent)
```javascript
superagent.get('http://localhost:7000/lastRequest')
  .set('method', 'POST')
  .set('path', '/postingPath')
  .end(function(_, res) {
    var lastRequestMade = res.body;
    res.body.headers // => {"paramName": "value"}
  });
```
### Use
After mocking, you can call the endpoint whichever way you like. Simulado starts a server on ```localhost:7001``` the path you specify is relative to this.
### Viewing mocked reponses
To inspect all the mocked endpoints you can goto `http://localhost:7001/inspect`. You can use these enpoints while developing your app by making an API call the `http://localhost:7001/[path]`.
