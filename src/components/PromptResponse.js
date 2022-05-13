import "./PromptResponse.css";
import { Container, Row, Col } from "react-bootstrap";
export default function PromptResponse({ prompt, response }) {
  return (
    <Container className="response-container" fluid>
      <Row>
        <Col sm={3}>
          <b>Prompt:</b>
        </Col>
        <Col sm={9}>{prompt}</Col>
      </Row>
      <Row>
        <Col sm={3}>
          <b>Response:</b>
        </Col>
        <Col sm={9}>{response}</Col>
      </Row>
    </Container>
  );
}
