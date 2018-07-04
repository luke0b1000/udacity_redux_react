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
    if (action.type === 'ADD_TODO') {
        return state.concat([action.todo]);
    }
    return state;   // Question: When does this get trigger???  if not equal to action.type HERE
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