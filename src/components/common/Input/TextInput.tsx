import { Field, ErrorMessage } from 'formik'
import React from 'react'
import { Form } from 'react-bootstrap'

interface TextInputProps {
  name: string
  label: string
  error: string | undefined
}

const TextInput = ({ name, label, error }: TextInputProps) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.FloatingLabel label={label}>
        <Field
          name={name}
          id={name}
          type="text"
          className={`form-control ${error ? 'is-invalid' : ''}`}
        />
      </Form.FloatingLabel>
      <ErrorMessage name={name} component="div" className="invalid-feedback" />
    </Form.Group>
  )
}

export default React.memo(TextInput)
