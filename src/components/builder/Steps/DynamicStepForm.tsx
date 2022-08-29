import { FormikErrors } from 'formik'
import { Col, Row } from 'react-bootstrap'
import { DynamicStep, DynamicStepInputTypes } from '../../../types'
import DynamicOptions from '../../common/Input/DynamicOptions'
import SelectInput from '../../common/Input/SelectInput'
import TextInput from '../../common/Input/TextInput'

interface DynamicStepFormProps {
  baseName: string
  errors: string | FormikErrors<DynamicStep> | undefined
  values: DynamicStep
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

const mapeableStepInputTypes = Object.keys(DynamicStepInputTypes)
  .filter((value) => Number.isInteger(Number(value)))
  .map((key) => ({ key: Number(key), value: DynamicStepInputTypes[Number(key)] }))

export default function DynamicStepForm({
  baseName,
  errors,
  values,
  setFieldValue,
}: DynamicStepFormProps) {
  if (typeof errors === 'string') return <p>{errors}</p>

  return (
    <>
      <Row>
        <Col>
          <TextInput name={`${baseName}.title`} label="Step title" error={errors?.title} />
        </Col>
        <Col>
          <TextInput
            name={`${baseName}.description`}
            label="Step description"
            error={errors?.description}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextInput
            name={`${baseName}.input.name`}
            label="Input name"
            error={errors?.input?.name}
          />
        </Col>
        <Col>
          <TextInput
            name={`${baseName}.input.label`}
            label="Input label"
            error={errors?.input?.label}
          />
        </Col>
        <Col>
          <SelectInput
            name={`${baseName}.input.type`}
            label="Input type"
            error={errors?.input?.type}
            options={mapeableStepInputTypes}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextInput
            name={`${baseName}.input.helpText`}
            label="Input help text"
            error={errors?.input?.helpText}
          />
        </Col>
        <Col>
          {Number(values.input.type) === DynamicStepInputTypes.Select ? (
            <DynamicOptions
              name={`${baseName}.input.options`}
              label="Add desired options"
              error={errors?.input?.options}
              value={values.input.options}
              setFieldValue={setFieldValue}
            />
          ) : null}
        </Col>
      </Row>
    </>
  )
}
