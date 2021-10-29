import { AUTHENTICATE, LOGOUT } from "../actions/auth";
const initialState={
    token:null,
    userId:null,
    expiresIn:0,
    id:'',
    email:'',
    telephone:'',
    name:'',
    address:'',
    avatar:'',
    google:false,
    photo:''
}

export default (state = initialState,action)=>{
    switch(action.type){
        case AUTHENTICATE:
            return{
                ...state,
                userId:action.userId,
                email:action.email,
                name:action.name
            }
        case LOGOUT:
            return initialState
        // case SIGNUP:
        //     return{
        //         token:action.token,
        //         userId:action.userId
        //     }
        default : return state 
    }
}