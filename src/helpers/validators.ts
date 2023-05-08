import * as Yup from 'yup';
import { getTodayAsIso, getYearsLaterAsIso } from '@/helpers/date';

const containerImageRe =
  /^(?!-)[A-Za-z0-9-]+(?<!-)(\.(?!-)[A-Za-z0-9-]+(?<!-))*(:[0-9]+)?(\/[A-Za-z0-9-_.]+)+(@[A-Za-z0-9]+)?(:[A-Za-z0-9-_.]+)?$/;

export const jupyterRequestSchema = Yup.object().shape({
  name: Yup.string().min(3).max(63).required().label('Project name'),
  slug: Yup.string()
    .min(3)
    .max(63)
    .matches(
      /^(?!-)[a-z0-9-]+(?<!-)$/,
      'Slug must be DNS compliant: only numbers, lowercase letters and hyphens are allowed, must not begin or end with a hyphen'
    )
    .required()
    .label('Slug'),
  description: Yup.string().max(2048).label('Description'),
  startDate: Yup.date()
    .min(getTodayAsIso())
    .max(getYearsLaterAsIso(3))
    .required()
    .label('Start date'),
  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'End date must be later than start date')
    .required()
    .label('End date'),
  containerImage: Yup.string()
    .max(256)
    .matches(
      containerImageRe,
      'Container Image must be a valid identifier, including the registry domain'
    )
    .required()
    .label('Container Image'),
  userConf: Yup.object().shape({
    userCount: Yup.number().min(5).max(500).required().label('Num. of users'),
    ramPerUser: Yup.number().min(0.25).max(4).required().label('RAM per user'),
    cpusPerUser: Yup.number().min(0.25).max(2).required().label('CPUs per user'),
    storagePerUser: Yup.number().min(0.5).max(10).required().label('Storage per user')
  }),
  tosConfirmation: Yup.boolean()
    .is([true], 'You must accept the terms of service')
    .required('You must accept terms of service')
});

export const localLoginSchema = Yup.object().shape({
  email: Yup.string().email().required().label('E-Mail address'),
  password: Yup.string().required().label('Password')
});

export const localRegisterSchema = Yup.object().shape({
  email: Yup.string().email().required().label('E-Mail address'),
  password: Yup.string().min(12).required().label('Password'),
  firstName: Yup.string().max(128).required().label('First Name'),
  lastName: Yup.string().max(128).required().label('Last Name')
});
