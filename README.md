# JSWebserviceMonitoring
Easy JS App for Monitoring Webservices healthy. Only need [Node.js](https://nodejs.org/) for your backend.

## Requires
Requires [Node.js](https://nodejs.org/) to run on your backend server and npm module [request](https://www.npmjs.com/package/request).

## Installation
You can install this app on every webserver. You need only configure two things.

### seetings.json
In _settings.json_ file you can configure every Webapp you want to monitor with this properties... 

            {
            "name":"git",
            "kontext":["nisasche","test"],
            "statusOk": 200,
            "PROD": {
                    "url": "https://github.com/"
                    },
            "TEST": {
                    "url": "https://github-test.com/"
                    }
            }
            
### testuri.js
