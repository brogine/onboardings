import { Formik, FieldArray } from 'formik'
import { Form, Accordion, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectById,
  createOnboarding,
  updateOnboarding,
} from '../../features/onboarding/onboardingsSlice'
import { RootState } from '../../store/types'
import { Onboarding, DynamicStep } from '../../types'
import { newStepSchema, initialValues } from './defaultValues'
import DynamicStepForm from './Steps/DynamicStepForm'
import OnboardingConfiguration from './Configuration'
import StepHeader from './Steps/StepHeader'
import validationSchema from './schema'
import WelcomeStepForm from './Steps/WelcomeStepForm'
import './MainForm.css'

interface MainFormProps {
  id?: string
  notifySubmit: () => void
}

export default function MainForm({ id, notifySubmit }: MainFormProps) {
  const dispatch = useDispatch()
  const onboarding = useSelector((state: RootState) => {
    return id ? selectById(state.onboardings, id) : null
  })
  const onSubmit = (values: Onboarding) => {
    dispatch((values.id === undefined ? createOnboarding : updateOnboarding)(values))
    notifySubmit()
  }

  return (
    <Formik
      initialValues={onboarding ?? initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, isValid, handleSubmit, setFieldValue }) => {
        return (
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <h3>{onboarding ? 'Edit Onboarding' : 'New Onboarding'}</h3>
            <OnboardingConfiguration errors={errors.configuration} />
            <h5>Steps</h5>
            <Accordion defaultActiveKey="welcome">
              <Card>
                <Card.Header>
                  <StepHeader eventKey="welcome" title="Welcome Step" />
                </Card.Header>
                <Accordion.Collapse eventKey="welcome">
                  <WelcomeStepForm errors={errors.welcomeStep} icons={values.welcomeStep.icons} />
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <FieldArray
              name="dynamicSteps"
              render={(arrayHelpers) => {
                const removeItem = (index: number) => arrayHelpers.remove(index)
                const addItem = () => arrayHelpers.push({ ...newStepSchema })
                const cloneItem = (element: DynamicStep) => arrayHelpers.push({ ...element })

                return (
                  <>
                    {values.dynamicSteps.map((step: DynamicStep, index) => (
                      <div key={index}>
                        <Accordion defaultActiveKey={index.toString()} className="card-body">
                          <Card>
                            <Card.Header>
                              <StepHeader
                                onDuplicate={() => cloneItem(step)}
                                onDelete={() => removeItem(index)}
                                eventKey={index.toString()}
                                title={step.title}
                              />
                            </Card.Header>
                            <Accordion.Collapse eventKey={index.toString()}>
                              <DynamicStepForm
                                baseName={`dynamicSteps[${index}]`}
                                errors={errors.dynamicSteps && errors.dynamicSteps[index]}
                                values={values.dynamicSteps[index]}
                                setFieldValue={setFieldValue}
                              />
                            </Accordion.Collapse>
                          </Card>
                        </Accordion>
                      </div>
                    ))}
                    <Button onClick={addItem}>Add step</Button>
                  </>
                )
              }}
            />
            <Button type="submit" disabled={!isValid}>
              Submit
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}
