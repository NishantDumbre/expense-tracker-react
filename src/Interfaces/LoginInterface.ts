export interface ForgotPwdInterface{
    email: string | undefined,
}

export interface AuthInterface extends ForgotPwdInterface{
    password: string | undefined,
    returnSecureToken: boolean
}
