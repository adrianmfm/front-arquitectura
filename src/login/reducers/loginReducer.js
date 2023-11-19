

const loginReducer = (state = {}, action) => {

    switch (action.type) {
        case 'login':
            
            return {
                isAuth: true,
                isDueno: action.payload.isDueno,
                email: action.payload.email
            };
        case 'logout':
            return {
                isAuth: false,
                isDueno: false,
                user: undefined,
            };
    
        default:
            return state;
    }

}

export default loginReducer;