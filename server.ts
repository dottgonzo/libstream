import * as express from "express"


import { htmlpage } from "./index"


const app = express();

app.use('/', htmlpage);

let port = 3231

if (process.env.SERVERPORT) port = process.env.SERVERPORT

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});







