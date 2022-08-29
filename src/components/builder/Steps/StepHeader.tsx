import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Button, ButtonGroup, Col, Row, useAccordionButton } from 'react-bootstrap'

interface StepHeaderProps {
  title: string
  eventKey: string
  onDuplicate?: () => void
  onDelete?: () => void
}

export default function StepHeader({ title, eventKey, onDuplicate, onDelete }: StepHeaderProps) {
  const [collapsed, setCollapsed] = useState(false)
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    setCollapsed((prevValue) => !prevValue),
  )
  const shouldRenderActions = onDuplicate || onDelete

  return (
    <Row>
      <Col onClick={decoratedOnClick} className="toggle-collapse">
        <h5>
          {collapsed ? <CaretDownOutlined /> : <CaretUpOutlined />}
          {title}
        </h5>
      </Col>
      <Col xs={3}>
        {shouldRenderActions && (
          <ButtonGroup aria-label="Actions" className="float-end">
            {onDuplicate && (
              <Button variant="secondary" onClick={onDuplicate}>
                Duplicate
              </Button>
            )}
            {onDelete && (
              <Button variant="danger" onClick={onDelete}>
                Delete
              </Button>
            )}
          </ButtonGroup>
        )}
      </Col>
    </Row>
  )
}
