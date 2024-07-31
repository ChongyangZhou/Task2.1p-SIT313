const express = require('express');
const bodyParser = require('body-parser');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || '2602e183a5d67859647a2bd78036df9b-afce6020-1dd8078f'});

app.post('/send-email', (req, res) => {
  const { recipientEmail } = req.body;

  mg.messages.create('sandbox758f878008074697b973e8c4c82f6362.mailgun.org', {
    from: "Excited User <chongyang.zhou970221@gmail.com>",
    to: [recipientEmail],
    subject: "Welcome to DEV@Deakin",
    text: "",
    html: "<h1>Welcome to DEV@Deakin!</h1><p>We're excited to have you on board.</p>"
  })
  .then(msg => {
    console.log(msg);
    res.json({ success: true, message: 'Email sent successfully!' });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error sending email.' });
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
