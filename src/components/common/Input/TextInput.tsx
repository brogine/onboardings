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
    <Form.FloatingLabel label={label} className="mb-3" controlId={name}>
      <Field
        name={name}
        id={name}
        type="text"
        className={`form-control ${error ? 'is-invalid' : ''}`}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.FloatingLabel>
  )
}

export default React.memo(TextInput)
