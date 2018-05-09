const express = require('express');
const app = express();


app.use(express.static(__dirname + '/dist/CalPainter'));


app.listen(process.env.PORT || 8080, function() {
    console.log(`Express server listeing in port ${process.env.PORT || 8080} you can access the webapp on http://localhost:8080/`);
});