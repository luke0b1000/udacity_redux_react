// Library Code
function createStore(reducer) {
    let state;
    let listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l != listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

// APP CODE
function todos(state = [], action) {
    switch(action.type) {
        case 'ADD_TODO':
            return state.concat([action.todo]);
        case 'REMOVE_TODO':
            return state.filter(todo => todo.id !== action.id);
        case 'TOGGLE_TODO':
            return state.map(todo => todo.id !== action.id ? todo :
                Object.assign({}, todo, { complete: !todo.complete}));
        default:
            return state; // Question: When does this get trigger???  if not equal to action.type HERE // RETURNS THE STATE WITH ACTION IT IS NOT CONCERN WITH
    }
}

function goals(state = [], action) {
    switch(action.type) {
        case 'ADD_GOAL':
            return state.concat([action.goal]);
        case 'REMOVE_GOAL':
            return state.filter(goal => goal.id !== action.id);
        default:
            return state;
    }
}

const store = createStore(todos);

const unsubscribe = store.subscribe(()=> {
    console.log('The new state is ', store.getState());
})

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false
    }
})