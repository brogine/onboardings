import { Field, ErrorMessage } from 'formik'
import React from 'react'
import { Form } from 'react-bootstrap'

interface SelectInputProps {
  name: string
  label: string
  placeholder?: string
  options: { key: number; value: string }[]
  error: string | undefined
}

const SelectInput = ({ name, label, placeholder, options, error }: SelectInputProps) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.FloatingLabel label={label}>
        <Field
          as="select"
          name={name}
          placeholder={placeholder || `Enter ${label}`}
          id={name}
          className={`form-select ${error ? 'is-invalid' : ''}`}
        >
          {options.map(({ key, value }) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </Field>
      </Form.FloatingLabel>
      <ErrorMessage name={name} component="div" className="invalid-feedback" />
    </Form.Group>
  )
}

export default React.memo(SelectInput)
