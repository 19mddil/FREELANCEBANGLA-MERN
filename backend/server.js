require('dotenv/config');
const app = require('./app');


if (process.env.NODE_ENV === 'development') {
    let port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Listening to port ${port}`);
    });
}
else {
    app.listen();
}
