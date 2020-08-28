import React, {useState} from 'react'
// noinspection ES6CheckImport
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prism-themes/themes/prism-atom-dark.css'
import './App.scss'


const routes = [
    {
        path: '/about',
        title: 'About',
        render: 'About?'
    }, {
        path: '/users',
        title: 'Users',
        render: 'Users!!'
    }
]


function App() {

    const [text, setText] = useState('')

    return (
        <div className="App">
            <Router>
                <nav>
                    <h2>Tools</h2>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {routes.map((route) => (
                            <li>
                                <Link to={route.path}>{route.title}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
                <div className="tool">
                    <h1>Hacker's Tool Box</h1>
                    <Switch>
                        {routes.map((route) => (
                            <Route path={route.path}>
                                {route.render}
                            </Route>
                        ))}
                        <Route path="/">
                            <p>Select a tool from the left</p>
                        </Route>
                    </Switch>
                </div>
                <div className="scratchPad">
                    <h2>Scratch pad</h2>
                    <Editor
                        value={text}
                        onValueChange={code => setText(code)}
                        highlight={text => highlight(text, languages.clike, 'clike')}
                        padding={10}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            flexGrow: 1,
                            boxShadow: '0 0 5px rgba(0,0,0,.6) inset',
                            backgroundColor: '#1e1b3b'
                        }}
                    />
                </div>
            </Router>
        </div>
    );
}

export default App;
