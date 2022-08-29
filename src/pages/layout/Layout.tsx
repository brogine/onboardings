import { Container, Row, Col } from 'react-bootstrap'
import NavigationBar from './NavigationBar'

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <NavigationBar />
      <Container>
        <Row>
          <Col>
            <main>{children}</main>
          </Col>
        </Row>
      </Container>
    </>
  )
}
