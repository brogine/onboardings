import { ErrorMessage } from 'formik'
import React, { useState } from 'react'
import { Button, CloseButton, Form, InputGroup } from 'react-bootstrap'

interface DynamicOptionsProps {
  name: string
  value: string[] | undefined
  label: string
  placeholder?: string
  error: string | undefined
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

const DynamicOptions = ({
  name,
  value,
  label,
  placeholder,
  error,
  setFieldValue,
}: DynamicOptionsProps) => {
  const [elements, setElements] = useState<string[]>(value || [])
  const [elementToAdd, setElementToAdd] = useState('')
  const addCurrent = () => {
    const newElements = [...elements, elementToAdd]
    setElements(newElements)
    setElementToAdd('')
    setFieldValue(name, newElements)
  }
  const removeElement = (el: string) => {
    setElements(elements.filter((currEl) => currEl !== el))
  }

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <InputGroup className="mb-3">
        <input
          type="text"
          placeholder="Type to add an item"
          className="form-control"
          value={elementToAdd}
          onChange={(event) => setElementToAdd(event.target.value)}
        />
        <Button onClick={addCurrent} variant="outline-secondary">
          Add
        </Button>
      </InputGroup>
      <select
        placeholder={placeholder || `Enter ${label}`}
        className={`form-select ${error ? 'is-invalid' : ''}`}
      >
        {elements.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
        {/* <CloseButton onClick={() => removeElement(el)} /> */}
      </select>
      <ErrorMessage name={name} component="div" className="invalid-feedback" />
    </Form.Group>
  )
}

export default React.memo(DynamicOptions)
