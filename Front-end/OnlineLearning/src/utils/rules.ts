import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = {
  [key in 'email' | 'password' | 'confirm_password' | 'dob' | 'address' | 'phone' | 'username']?: RegisterOptions
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    .required('Phone is required')
    .matches(/^0\d{9}$/, 'Phone number must have 10 digits and start with 0'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must have between 5 and 160 characters')
    .max(160, 'Password must have between 5 and 160 characters'),
  confirm_password: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Confirm password does not match'),
  address: yup.string(),
  dob: yup.string()
})

export type Schema = yup.InferType<typeof schema>

export const userSchema = yup.object({
  email: schema.fields.email as yup.StringSchema<string>,
  username: schema.fields.username as yup.StringSchema<string>,
  phone: schema.fields.phone as yup.StringSchema<string>,
  address: schema.fields.address as yup.StringSchema<string>,
  dob: schema.fields.dob as yup.StringSchema<string>,
  role: yup.string().required('Role is required')
})

export type UserSchema = yup.InferType<typeof userSchema>

export const changePasswordSchema = yup.object({
  oldPassword: yup.string().required('Password is required'),
  newPassword: schema.fields.password as yup.StringSchema<string>,
  confirm_password: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('newPassword')], 'Confirm password does not match')
})

export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>
