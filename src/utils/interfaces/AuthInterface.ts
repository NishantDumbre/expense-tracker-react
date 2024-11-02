export interface ForgotPwdInterface {
  email: string | undefined;
}

export interface AuthInterface extends ForgotPwdInterface {
  password: string | undefined;
  returnSecureToken: boolean;
}

export interface LoginProps {
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  toggleAuthType: (type: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface SignupProps {
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  confirmPasswordRef: React.RefObject<HTMLInputElement>;
  toggleAuthType: (type: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface ForgotPwdProps {
  emailRef: React.RefObject<HTMLInputElement>;
  toggleAuthType: (type: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
