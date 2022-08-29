import { CSSProperties } from 'react'
import { Col, Row, Tab } from 'react-bootstrap'
import { WizardTab } from '../../../types'
import WizardHeader from './WizardHeader'
import WizardTabContent from './WizardTabContent'
import './Wizard.css'

const ROOT_CLASS = 'wizard'
const HEADER_CLASS = `${ROOT_CLASS}__header`
const BODY_CLASS = `${ROOT_CLASS}__body`

interface WizardProps {
  activeKey: string
  style?: CSSProperties
  tabs: WizardTab[]
  onGoPrevious: () => void
  onGoNext: () => void
}

export default function Wizard({ activeKey, style, tabs, onGoPrevious, onGoNext }: WizardProps) {
  const isLastTab = tabs[tabs.length - 1].key === activeKey
  const currentIndex = tabs.findIndex((el) => el.key === activeKey)

  return (
    <section className={ROOT_CLASS} style={{ ...style }}>
      <Tab.Container activeKey={activeKey}>
        <WizardHeader className={HEADER_CLASS} tabs={tabs} currentIndex={currentIndex} />
        <Row className={BODY_CLASS}>
          <Col>
            <Tab.Content>
              {tabs.map((tab) => (
                <WizardTabContent
                  key={tab.key}
                  tab={tab}
                  isLastTab={isLastTab}
                  onGoNext={onGoNext}
                  onGoPrevious={onGoPrevious}
                />
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </section>
  )
}
