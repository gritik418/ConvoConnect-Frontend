import { InferType, object, ref, string } from "yup";

const signupSchema = object({
  first_name: string().required().min(3),
  last_name: string(),
  email: string().required().email(),
  username: string().required(),
  password: string().required().min(8).max(32),
  password_confirmation: string()
    .required()
    .oneOf([ref("password")], "Password and confirm password must be same"),
});

export type SignUpDataType = InferType<typeof signupSchema>;

export default signupSchema;
