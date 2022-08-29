import DynamicIcon from '../common/DynamicIcon'
import {
  DynamicStep,
  DynamicStepInput,
  DynamicStepInputTypes,
  OnInputChangeType,
  WelcomeStep,
} from '../../types'

export const renderWelcomeStepBody = ({ description, icons }: WelcomeStep) => {
  return (
    <>
      <p>{description}</p>
      <div className="icons">
        {icons.map((icon) => (
          <div key={icon.icon} className="icon">
            <DynamicIcon icon={icon.icon} />
            <p>{icon.label}</p>
          </div>
        ))}
      </div>
    </>
  )
}

const renderInputByType = (
  { type, options, name }: DynamicStepInput,
  onChange: OnInputChangeType,
) => {
  switch (Number(type)) {
    case DynamicStepInputTypes.Number:
      return (
        <input required className="form-control" type="number" name={name} onChange={onChange} />
      )
    case DynamicStepInputTypes.Select:
      return (
        <select required className="form-select" name={name} defaultValue="" onChange={onChange}>
          <option disabled value="">
            Please, select an option
          </option>
          {options?.map((el) => (
            <option value={el}>{el}</option>
          ))}
        </select>
      )
    case DynamicStepInputTypes.Text:
      return <input required className="form-control" type="text" name={name} onChange={onChange} />
    case DynamicStepInputTypes.Textarea:
      return <textarea required className="form-control" name={name} cols={3} onChange={onChange} />
    default:
      return null
  }
}

export const renderDynamicStepBody =
  ({ description, input }: DynamicStep) =>
  (onChange: OnInputChangeType) => {
    return (
      <>
        <p>{description}</p>
        <div className="form-group">
          <label htmlFor={input.name}>{input.label}</label>
          {renderInputByType(input, onChange)}
          {input.helpText ? <span className="text-muted help-text">{input.helpText}</span> : null}
        </div>
      </>
    )
  }
