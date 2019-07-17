const initialState = {

}

export default(state = initialState,action)=>{
    const {payload} = action;
    switch (action.type){
        case 'CREATE_USER':
            return payload
        case 'LOG':
            return {...state,isLogged:payload}
        case "REQUEST":
            return state;
        default: return state
    }
}
