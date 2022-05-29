const express = require('express');
const app = express();

var http = require('http');
var enforce = require('express-sslify');
app.use(enforce.HTTPS({ trustProtoHeader: true }));
http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
// Serve only the static files form the dist directory
// https://medium.com/@ryanchenkie_40935/angular-cli-deployment-host-your-angular-2-app-on-heroku-3f266f13f352
app.use(express.static('./dist/appachatfront'));
app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/appachatfront'}),
);
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200, () => {
  console.log(process.env.PORT);
});
