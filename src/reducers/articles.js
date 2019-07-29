const initialState = {
    articles:[],
}

export default(state = initialState,action)=>{
    const {articles} = state;
    const {payload} = action;
    switch (action.type){
        case 'LOAD_ARTICLES':
            return {...state, articles:payload}
        case 'ADD_ARTICLE':
            return {...state,articles:[...articles,payload]}
        case 'EDIT_ARTICLE':
             (articles.map((article,id)=>{
                if(article.id===payload.id){
                    return {...state,articles:[...articles,articles[id]=payload]}
                }else{
                    return state
                }
            }))
        case 'DELETE_ARTICLE':
            return {...state,articles:articles.filter((data) => data.id !== action.payload)}
        case "REQUEST":
            return state;
        default: return state
    }
}

