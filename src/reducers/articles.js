const initialState = {
    articles:[],
    tags:[]
}

export default(state = initialState,action)=>{
    const {articles} = state;
    const {payload} = action;
    switch (action.type){
        case 'LOAD_ARTICLES':
            return {...state, articles:payload}
        case 'LOAD_TAGS':
            return {...state, tags:payload}
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
            break
        case 'DELETE_ARTICLE':
            return {...state,articles:articles.filter((data) => data.id !== action.payload)}
        case "REQUEST":
            return state;
        default: return state
    }
}

