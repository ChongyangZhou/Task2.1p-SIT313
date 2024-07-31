document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const recipientEmail = document.getElementById('recipientEmail').value;
  
    fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ recipientEmail })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('Email sent successfully!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error sending email.');
    });
  });
  