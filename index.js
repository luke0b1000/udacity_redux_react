function todos(state = [], action) {
    if (action.type ===' ADD_TODO') {
        return state.concat([action.todo]);
    }
    return state;   // Question: When does this get trigger???  if not equal to action.type HERE
}

function createStore() {
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
        state = todos(state, action);
        listeners.forEach(listener => listener());
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

const store = createStore();

const unsubscribe = store.subscribe(()=> {
    console.log('The new state is ', store.getState());
})

unsubscribe();