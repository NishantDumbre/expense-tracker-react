export interface UserSliceInterface {
    token: string | null,
    verified: boolean,
    premium: boolean,
    details:{
        name:string,
        email:string,
        profileUrl:string
      }
}