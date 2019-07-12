const initialState = {
    isLogged: true,
    articles:[
        { 
          id:1,     
          title:"Lorem ipsum",
          body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          tags:"tag1, tag2"
        },
        {      
          id:2,
            title:"Ipsum lorem",
            body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            tags:"tag2, tag3"
        },
        {     
          id:3, 
          title:"Dolor sit amet",
          body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          tags:"tag1, tag4"
        },
        { 
            id:4,     
            title:"Lorem ipsum",
            body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            tags:"tag1, tag2"
          },
          {      
            id:5,
              title:"Ipsum lorem",
              body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              tags:"tag2, tag3"
          },
          {     
            id:6, 
            title:"Dolor sit amet",
            body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            tags:"tag1, tag4"
          }
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
        case 'ADD_TAG':
            return {...state,tags:[...tags,payload]}
        case 'CHANGE_ARTICLE':
            return {...state,articles:payload}
        case 'LOG':
            return {...state,isLogged:payload}
        case 'DELETE_ARTICLE':
            return {...state,articles:articles.filter((data, i) => i !== action.payload)}
        case "REQUEST":
            return state;
        default: return state
    }
}
