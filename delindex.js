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

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

function addTodoAction (todo) {
    return {
        type: ADD_TODO,
        todo
    }
}

function removeTodoAction (id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

function toggleTodoAction (id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}

function addGoalAction (goal) {
    return {
        type: ADD_GOAL,
        goal
    }
}

function removeGoalAction(id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}

// APP CODE
function todos(state = [], action) {
    switch(action.type) {
        case ADD_TODO:
            return state.concat([action.todo]);
        case REMOVE_TODO:
            return state.filter(todo => todo.id !== action.id);
        case TOGGLE_TODO:
            return state.map(todo => todo.id !== action.id ? todo :
                Object.assign({}, todo, { complete: !todo.complete}));
        default:
            return state; // Question: When does this get trigger???  if not equal to action.type HERE // RETURNS THE STATE WITH ACTION IT IS NOT CONCERN WITH
    }
}

function goals(state = [], action) {
    switch(action.type) {
        case ADD_GOAL:
            return state.concat([action.goal]);
        case REMOVE_GOAL:
            return state.filter(goal => goal.id !== action.id);
        default:
            return state;
    }
}

function rootReducer(state = {}, action) {
    return {
        todos: todos(state.todos, action),  // RETURNS {todos_STATE_TREE}
        goals: goals(state.goals, action),  // RETURNS {GOALS_STATE_TREE}
    }
}

// QUESTION I don't understand how rootReducer, going into createStore then when inside dispatch library code,
// it executes the object like an map/foreach????
const store = createStore(rootReducer);     // ROOT REDUCER IS A BIG STATE TREE { todos: {todos_state_tree}, goals: {goals_STATE_TREE}}

const unsubscribe = store.subscribe(()=> {
    console.log('The new state is ', store.getState());
})

store.dispatch(addTodoAction(
    {
        id: 0,
        name: 'Learn Redux',
        complete: false
    }
))