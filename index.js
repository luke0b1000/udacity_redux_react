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