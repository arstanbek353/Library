import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import Store from './store/store'

export const store = new Store()

export const Context = createContext({
    store,
})

ReactDOM.render(
    <React.StrictMode>
        <Context.Provider value={{
            store
        }}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Context.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// API_URL="https://floating-journey-29986.herokuapp.com"
// CLIENT_URL="https://floating-journey-29986.herokuapp.com"
