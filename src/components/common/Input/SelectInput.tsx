import { Field } from 'formik'
import React from 'react'
import { Form } from 'react-bootstrap'

interface SelectInputProps {
  name: string
  label: string
  options: { key: number; value: string }[]
  error: string | undefined
}

const SelectInput = ({ name, label, options, error }: SelectInputProps) => {
  return (
    <Form.FloatingLabel label={label} className="mb-3" controlId={name}>
      <Field
        as="select"
        name={name}
        id={name}
        className={`form-select ${error ? 'is-invalid' : ''}`}
      >
        {options.map(({ key, value }) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </Field>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.FloatingLabel>
  )
}

export default React.memo(SelectInput)
