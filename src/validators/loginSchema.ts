import { string, object } from "yup";

const loginSchema = object({
  email: string().required(),
  password: string().required().min(8).max(32),
});

export default loginSchema;
