'use client'
import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

// initial state
const initialState = {
    user: null,
    fetchingUser: true,
    completeTasks: [],
    incompleteTasks: [],
}

// reducer 
const globalReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                fetchingUser: false,
            }
        // COMPLETE
        case "SET_COMPLETE_TODOS":
            return {
                ...state,
                completeTasks: action.payload
            };

        // INCOMPLETE
        case "SET_INCOMPLETE_TODOS":
            return {
                ...state,
                incompleteTasks: action.payload
            };

        // RESET USER
        case "RESET_USER":
            return {
                ...state,
                user: null,
                completeTasks: [],
                incompleteTasks: [],
                fetchingUser: false
            }
        default:
            return state;
    }
}

// create context
export const GlobalContext = createContext(initialState);

// provdier component
export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(globalReducer, initialState)

    useEffect(() => {
        getCurrentUser();
    }, [])

    // get current user
    const getCurrentUser = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/current')

            if (res.data) {
                const taskRes = await axios.get('http://localhost:5000/api/tasks/current')


                if (taskRes.data) {
                    dispatch({ type: "SET_USER", payload: res.data });
                    dispatch({ type: "SET_COMPLETE_TASKS", payload: taskRes.data.complete })
                    dispatch({ type: "SET_INCOMPLETE_TASKS", payload: taskRes.data.incomplete })
                } else {
                    dispatch({ type: "RESET_USER" })
                }
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: "RESET_USER" })
        }
    }

    // log out
    const logout = async () => {
        try {
            await axios.put('http://localhost:5000/api/auth/logout')

            dispatch({ type: "RESET_USER" });

        } catch (error) {
            console.log(error);
        }
    }

    const value = {
        ...state,
        getCurrentUser,
        logout,
    }
    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}