// User.js

// Actions
const LOAD = 'User/LOAD';
const CREATE = 'User/CREATE';


const initialState = {
    list:[],
}


// Action Creators
export function loadUser() {
return { type: LOAD };
}

export function createUser(user_info) {
return { type: CREATE, user_info };
}



// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'User/CREATE' : {
            
              const new_user_info= [...state.list, action.user_info];
               return { list : new_user_info}; 
            
        }
    // do reducer stuff
    default: 
     return state;
    }
    }
    