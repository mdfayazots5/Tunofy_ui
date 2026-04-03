import * as yup from 'yup';

export const profileSchema = yup.object().shape({
  name: yup.string().required('Full name is required').min(2, 'Name is too short'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobile: yup.string().optional(),
  preferredLanguage: yup.string().required('Preferred language is required'),
  preferredCountry: yup.string().required('Preferred country is required'),
  favoriteGenres: yup.array().of(yup.string()).min(1, 'Select at least one genre'),
});

export const feedbackSchema = yup.object().shape({
  issueType: yup.string().required('Issue type is required'),
  subject: yup.string().required('Subject is required').min(5, 'Subject is too short'),
  message: yup.string().required('Message is required').min(10, 'Message is too short'),
  contactEmail: yup.string().email('Invalid email').required('Contact email is required'),
  stationId: yup.string().optional(),
});
