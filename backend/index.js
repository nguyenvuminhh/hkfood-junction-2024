
require("./app")
const { server } = require('./socket/socket');

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
});
