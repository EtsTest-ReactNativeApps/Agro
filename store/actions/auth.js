export const AUTHENTICATE='AUTHENTICATE';
export const LOGOUT='LOGOUT';
export const GET_USER='GET_USER'
export const UPDATE_USER='UPDATE_USER'
export const authenticate=(userId,email,name) => {
    return{
        type:AUTHENTICATE,
        userId:userId,
        email:email,
        name:name
    }
}
export const logout=()=>{
    return{type:LOGOUT}
}