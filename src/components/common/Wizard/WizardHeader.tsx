import { Col, Nav, Row } from 'react-bootstrap'
import { WizardTab } from '../../../types'

interface WizardHeaderProps {
  tabs: WizardTab[]
  currentIndex: number
  className: string
}

export default function WizardHeader({ tabs, currentIndex, className }: WizardHeaderProps) {
  return (
    <Row className={className}>
      <Col>
        <p>
          Step {currentIndex + 1} of {tabs.length}
        </p>
        <Nav variant="pills">
          {tabs.map(({ key }) => (
            <Nav.Item key={key}>
              <Nav.Link eventKey={key} />
            </Nav.Item>
          ))}
        </Nav>
      </Col>
    </Row>
  )
}
