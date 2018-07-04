function todos(state = [], action) {
    if (action.type ===' ADD_TODO') {
        return state.concat([action.todo]);
    }
    return state;   // Question: When does this get trigger???  if not equal to action.type
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

    return {
        getState,
        subscribe
    }
}

const store = createStore();

const unsubscribe = store.subscribe(()=> {
    console.log('The new state is ', store.getState());
})

unsubscribe();