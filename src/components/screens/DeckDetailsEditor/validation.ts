import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string().required(),
  notes: Yup.string(),
  autoDetectColors: Yup.boolean().required(),
  colors: Yup.array(Yup.string()),
});
