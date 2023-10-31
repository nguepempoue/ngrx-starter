import { Action, ActionReducer, MetaReducer, createReducer, on } from "@ngrx/store";
import { changeUsername, initAction } from "./01-actions";
import { User } from "../models/user";

export interface State{
    root: RootState
}

export interface RootState{
    appName: string;
    user: User
}

const initialSate: RootState = {
    appName: 'NgRx',
    user: {
        username: '',
        isAdmin: false
    }
}

function log(reducer: ActionReducer<State>): ActionReducer<State>{
    return (state, action) => {
        const currentState = reducer(state, action);
        
        console.groupCollapsed(action.type);
        console.log('Etat precedent: ', state);
        console.log('Action: ', action);
        console.log('Etat suivant: ', currentState);
        console.groupEnd();
        
        return currentState;
    }
}

export const metaReducers: MetaReducer[] = [log];

export const rootReducer = createReducer<RootState, Action>(initialSate, 
        on(initAction, (state: RootState) =>{
            return {
                ... state,
                user: {
                    ...state.user,
                    isAdmin: true
                }
            }
        }),

        on(changeUsername, (state: RootState, props) => {
            return{
                ...state,
                user:{
                    ...state.user,
                    username: props.username
                }
            }
        })
    );