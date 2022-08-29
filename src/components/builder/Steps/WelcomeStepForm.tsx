import { FastField, Field, FieldArray, FormikErrors } from 'formik'
import { Row, Col, ListGroup, Button, CloseButton } from 'react-bootstrap'
import * as antdIcons from '@ant-design/icons'
import { StepIcon, WelcomeStep } from '../../../types'
import DynamicIcon from '../../common/DynamicIcon'
import TextInput from '../../common/Input/TextInput'

const BASE_NAME = 'welcomeStep'
const MAX_ICONS = 5

interface WelcomeStepFormProps {
  errors: string | FormikErrors<WelcomeStep> | undefined
  icons: StepIcon[]
}

const iconOptionList = () => {
  return Object.keys(antdIcons).map((name) => (
    <option key={name} value={name}>
      {name}
    </option>
  ))
}

export default function WelcomeStepForm({ errors, icons }: WelcomeStepFormProps) {
  if (typeof errors === 'string') return <p>{errors}</p>

  return (
    <>
      <Row>
        <Col>
          <TextInput name={`${BASE_NAME}.title`} label="Step title" error={errors?.title} />
        </Col>
        <Col>
          <TextInput
            name={`${BASE_NAME}.description`}
            label="Step description"
            error={errors?.description}
          />
        </Col>
        <Col>
          <TextInput
            name={`${BASE_NAME}.footerButtonText`}
            label="Step button text"
            error={errors?.footerButtonText}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Icons</p>
          <FieldArray
            name={`${BASE_NAME}.icons`}
            render={(arrayHelpers) => (
              <>
                <ListGroup horizontal>
                  {icons.length
                    ? icons.map((icon, index) => (
                        <ListGroup.Item key={index}>
                          <CloseButton onClick={() => arrayHelpers.remove(index)} />
                          {icon.icon ? <DynamicIcon icon={icon.icon} /> : null}
                          <FastField as="select" name={`${BASE_NAME}.icons[${index}].icon`}>
                            <option value="">Select an Icon</option>
                            {iconOptionList()}
                          </FastField>
                          <Field
                            name={`${BASE_NAME}.icons[${index}].label`}
                            placeholder="Label for the icon"
                            type="text"
                            className="form-control"
                          />
                        </ListGroup.Item>
                      ))
                    : null}
                </ListGroup>
                <Button
                  disabled={icons.length >= MAX_ICONS}
                  onClick={() => arrayHelpers.push({ label: '', icon: '' })}
                >
                  Add Icon
                </Button>
              </>
            )}
          />
        </Col>
      </Row>
    </>
  )
}
