import { ErrorMessage, Field } from 'formik'
import React from 'react'
import { Form } from 'react-bootstrap'

interface ColorInputProps {
  name: string
  label: string
  error: string | undefined
}

const ColorInput = ({ name, label, error }: ColorInputProps) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Field
        name={name}
        id={name}
        type="color"
        className={`form-control ${error ? 'is-invalid' : ''}`}
      />
      <ErrorMessage name={name} component="div" className="invalid-feedback" />
    </Form.Group>
  )
}

export default React.memo(ColorInput)
