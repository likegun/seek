'use strict';
const app = require('./server/app.js');

app.listen(3000, () => {
	console.log('listen on port 3000!');
});
