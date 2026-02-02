const express = require('express');
const app = express();

app.use(express.json());
app.use('/api', require('./routes'));

app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on port 5000');
});


// app.listen(5000, () => {
//   console.log('Server running on http://localhost:5000');
// });
