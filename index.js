const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors= require('cors')
const app = express();
const PORT = 5000;
app.use(cors());

app.use(bodyParser.json());

app.post('/api/send-email', async (req, res) => {
  const {myemail, mypassword, recipient, subject, message } = req.body;


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: myemail,
      pass: mypassword 
    }
  });


  const mailOptions = {
    from: myemail,
    to: recipient,
    subject: subject,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Error sending email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
