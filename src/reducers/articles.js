const initialState = {
    articles:[
        { 
          id:1,     
          title:"Lorem ipsum",
          body:"1111111",
          tags:"tag1, tag2",
          author:"123",
          likes:10,
          comments:[
                {
                  id:"1",
                  author:"111",
                  created:"13.08.2017",
                  body:"Good article"
                },
                {
                  id:"2",
                  author:"111",
                  created:"27.03.2018",
                  body:"Good article"
                  },
            ]
        },
    ],
    tags:[
        {name:"tag1"},
        {name:"tag2"},
        {name:"tag3"},
        {name:"tag4"},
        {name:"tag5"}
    ],
}

export default(state = initialState,action)=>{
    const {articles} = state;
    const { tags } = state;
    const {payload} = action;
    switch (action.type){
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
        case 'LIKE':
             (articles.map((article,id)=>{
                if(article.id===payload.id){
                    return {...state,articles:[...articles,articles[id].likes=payload.likes]}
                }else{
                    return state
                }
            }))
        case 'ADD_TAG':
            return {...state,tags:[...tags,payload]}
        case 'DELETE_ARTICLE':
            return {...state,articles:articles.filter((data) => data.id !== action.payload)}
        case "REQUEST":
            return state;
        default: return state
    }
}

