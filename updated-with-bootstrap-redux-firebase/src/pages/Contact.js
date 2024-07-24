import React, { useState } from "react";
import { Button, Card, CloseButton } from "react-bootstrap";

const Contact = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      {open && (
        <Card className="text-center" style={{ width: '300px', maxWidth: '90%', marginBottom: '20px' }}>
          <Card.Header>
            <h4>Contact Information</h4>
            <CloseButton
              aria-label="Hide"
              onClick={() => setOpen(false)}
              style={{ position: 'absolute', right: '10px', top: '10px' }}
            />
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <h3>Lokesh Patidar</h3>
            </Card.Title>
            <Card.Text>
              <p>Contact No: 8839872196</p>
              <p>WhatsApp: 8839872196</p>
              <p>
                Email: <a href="mailto:lpatidar00@gmail.com">lpatidar00@gmail.com</a>
              </p>
            </Card.Text>
            <Button variant="primary" href="https://www.google.com" target="_blank">
              Connect
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Contact;
