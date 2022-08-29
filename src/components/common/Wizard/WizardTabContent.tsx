import { ChangeEvent, useState } from 'react'
import { Tab, Button } from 'react-bootstrap'
import { WizardTab } from '../../../types'

const ROOT_CLASS = 'wizard'
const STEP_CLASS = `${ROOT_CLASS}__step`
const STEP_HEADER_CLASS = `${ROOT_CLASS}__step-header`
const STEP_BODY_CLASS = `${ROOT_CLASS}__step-body`
const STEP_FOOTER_CLASS = `${ROOT_CLASS}__step-footer`
const NEXT_BUTTON_CLASS = `${ROOT_CLASS}__next`
const PREVIOUS_BUTTON_CLASS = `${ROOT_CLASS}__previous`

interface WizardTabContentProps {
  tab: WizardTab
  isLastTab: boolean
  onGoPrevious: () => void
  onGoNext: () => void
}

export default function WizardTabContent({
  tab: { key, title, body, bodyWithHandler, buttonStyles, footer, isDefaultValid },
  isLastTab,
  onGoPrevious,
  onGoNext,
}: WizardTabContentProps) {
  const [disabled, setDisabled] = useState(!isDefaultValid)
  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setDisabled(event.target.value.length === 0)
  }
  const welcomeBody = body !== undefined ? body : null
  const dynamicBody = bodyWithHandler !== undefined ? bodyWithHandler(onChangeHandler) : null

  return (
    <Tab.Pane eventKey={key} key={key} className={STEP_CLASS}>
      <div className={STEP_HEADER_CLASS}>
        <h3>{title}</h3>
      </div>
      <div className={STEP_BODY_CLASS}>{welcomeBody || dynamicBody}</div>
      <div className={STEP_FOOTER_CLASS}>
        {footer === undefined ? (
          <>
            <Button
              style={{ ...buttonStyles.previous }}
              className={PREVIOUS_BUTTON_CLASS}
              onClick={onGoPrevious}
            >
              PREVIOUS
            </Button>
            {!isLastTab ? (
              <Button
                type="button"
                style={{ ...buttonStyles.next }}
                className={NEXT_BUTTON_CLASS}
                onClick={onGoNext}
                disabled={disabled}
              >
                NEXT
              </Button>
            ) : null}
            {isLastTab ? (
              <Button
                type="submit"
                style={{ ...buttonStyles.next }}
                className={NEXT_BUTTON_CLASS}
                disabled={disabled}
              >
                SUBMIT
              </Button>
            ) : null}
          </>
        ) : (
          <Button
            style={{ ...buttonStyles.next }}
            className={NEXT_BUTTON_CLASS}
            onClick={onGoNext}
            disabled={disabled}
            type="button"
          >
            {footer}
          </Button>
        )}
      </div>
    </Tab.Pane>
  )
}
