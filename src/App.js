import React, {useState} from 'react'
// noinspection ES6CheckImport
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom"
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prism-themes/themes/prism-atom-dark.css'
import './App.scss'
import routes from './routes'


function App() {

    const [text, setText] = useState('')

    return (
        <div className="App">
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                    </ul>
                    <h2>Tools</h2>
                    <ul>
                        {routes.map((route, i) => (
                            <NavNode key={i} id={i} route={route}/>
                        ))}
                    </ul>
                </nav>
                <div className="tool-area">
                    <h1>Hacker's Tool Box</h1>
                    <Switch>
                        {routes.map((route, i) => (
                            route.routes ? (
                                route.routes.map((route, j) => (
                                    <Route key={i+'.'+j} path={route.path}>
                                        <h2>{route.title}</h2>
                                        <route.render/>
                                    </Route>
                                ))
                            ) : (
                                <Route key={i} path={route.path}>
                                    <h2>{route.title}</h2>
                                    <route.render/>
                                </Route>
                            )
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
