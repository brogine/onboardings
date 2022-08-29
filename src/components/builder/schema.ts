import * as Yup from 'yup'

export const welcomeStepValidationSchema = Yup.object().shape({
  welcomeStep: Yup.object().shape({
    title: Yup.string().min(3).required(),
    description: Yup.string().min(3),
    footerButtonText: Yup.string().min(3).required(),
    icons: Yup.array().of(
      Yup.object().shape({
        label: Yup.string().min(3).required(),
        icon: Yup.string().required(),
      }),
    ),
  }),
})

export const dynamicStepsValidationSchema = Yup.object().shape({
  dynamicSteps: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().min(3).required(),
      description: Yup.string().min(3),
      input: Yup.object().shape({
        name: Yup.string().min(3).required(),
        label: Yup.string().min(3).required(),
        type: Yup.string().required(),
        helpText: Yup.string(),
        options: Yup.array().of(Yup.string()),
      }),
    }),
  ),
})

export const configurationSchema = Yup.object().shape({
  configuration: Yup.object().shape({
    name: Yup.string().min(3).required(),
    next: Yup.object().shape({
      color: Yup.string(),
      backgroundColor: Yup.string(),
    }),
    previous: Yup.object().shape({
      color: Yup.string(),
      backgroundColor: Yup.string(),
    }),
  }),
})

export const baseOnboardingSchema = Yup.object().shape({
  status: Yup.string().min(3).required(),
})

export default baseOnboardingSchema
  .concat(configurationSchema)
  .concat(welcomeStepValidationSchema)
  .concat(dynamicStepsValidationSchema)
