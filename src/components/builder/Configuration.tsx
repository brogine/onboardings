import { FormikErrors } from 'formik'
import { Row, Col } from 'react-bootstrap'
import { AvailableFonts, OnboardingConfiguration } from '../../types'
import ColorInput from '../common/Input/ColorInput'
import SelectInput from '../common/Input/SelectInput'
import TextInput from '../common/Input/TextInput'

interface ConfigurationProps {
  errors: string | FormikErrors<OnboardingConfiguration> | undefined
}

// font-family: 'Montserrat', sans-serif;
// font-family: 'Raleway', sans-serif;
// font-family: 'Source Sans Pro', sans-serif;

const mapeableFonts = Object.keys(AvailableFonts)
  .filter((value) => Number.isInteger(Number(value)))
  .map((key) => ({ key: Number(key), value: AvailableFonts[Number(key)] }))

export default function Configuration({ errors }: ConfigurationProps) {
  if (typeof errors === 'string') return <p>{errors}</p>

  return (
    <>
      <Row>
        <Col>
          <TextInput name="configuration.name" label="Onboarding name" error={errors?.name} />
        </Col>
      </Row>
      <Row>
        <Col>
          <SelectInput
            name="configuration.font"
            label="Font"
            options={mapeableFonts}
            error={errors?.font}
          />
        </Col>
        <Col>
          <ColorInput
            name="configuration.next.backgroundColor"
            label="Next button background"
            error={errors?.next?.backgroundColor}
          />
        </Col>
        <Col>
          <ColorInput
            name="configuration.next.color"
            label="Next button text"
            error={errors?.next?.color}
          />
        </Col>
        <Col>
          <ColorInput
            name="configuration.previous.backgroundColor"
            label="Previous button background"
            error={errors?.previous?.backgroundColor}
          />
        </Col>
        <Col>
          <ColorInput
            name="configuration.previous.color"
            label="Previous button text"
            error={errors?.previous?.color}
          />
        </Col>
      </Row>
    </>
  )
}
