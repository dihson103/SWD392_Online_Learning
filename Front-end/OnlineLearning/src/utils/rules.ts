import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = {
  [key in 'email' | 'password' | 'confirm_password' | 'dob' | 'address' | 'phone' | 'username']?: RegisterOptions
}

export const getRules = (getValues: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email is required'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Wrong email format'
    }
  },
  username: {
    required: {
      value: true,
      message: 'Username is required'
    }
  },
  phone: {
    required: {
      value: true,
      message: 'Phone is required'
    },
    pattern: {
      value: /^0\d{9}$/,
      message: 'Phone number have 10 numbers and start with 0'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password is required'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Confirm password is required'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Confirm password is not true'
        : undefined
  }
})

export const schema = yup.object({
  email: yup.string().required('Email is required').email('Wrong email format'),
  username: yup.string().required('Username is required'),
  phone: yup
    .string()
    .required('Phone is requierd')
    .matches(/^0\d{9}$/, 'Phone number have 10 numbers and start with 0'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must have from 5 to 160 characters')
    .max(160, 'Password must have from 5 to 160 characters'),
  confirm_password: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Confirm password is not true'),
  address: yup.string(),
  dob: yup.string()
})

export type Schema = yup.InferType<typeof schema>
