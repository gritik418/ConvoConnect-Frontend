import { InferType, object, string } from "yup";

const loginSchema = object({
  email: string().required(),
  password: string().required().min(8).max(32),
});

export type LoginDataType = InferType<typeof loginSchema>;

export default loginSchema;
