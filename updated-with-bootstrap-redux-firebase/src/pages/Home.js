import { Container, Row, Col, Alert , Button } from "react-bootstrap";


function HomePage() {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Alert variant="warning">
            <h1>Welcome To Expense Tracker</h1>
            <Button variant="success" className="mt-3">Get Started</Button>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
