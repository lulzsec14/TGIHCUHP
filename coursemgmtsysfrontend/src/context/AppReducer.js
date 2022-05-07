const AppReducer = (state,action) => {
    switch(action.type){
        case "SAVE_USER_LOGIN":
            return{
                ...state,
                ...action.payload,
                currentUser:action.payload
            }
        case "SAVE_USER_DETAILS":
            return{
                ...state,
                ...action.payload,
                userDetails:action.payload
            }

        default:{
            return state;
        }
    }
}

export default AppReducer;