require('dotenv').config();
const app = require('./app');
const connectDB = require('./src/config/connection_db');

const port = process.env.PORT || 3030;

connectDB();

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
