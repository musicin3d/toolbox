import React, {useState} from "react"
import {NavLink} from "react-router-dom"
import './NavNode.scss'


export default function NavNode(props){

    // noinspection JSUnresolvedVariable
    const route = props.route
    const id = props.id

    const [open, setOpen] = useState(false)

    // noinspection JSUnresolvedVariable
    return (
        <li className='NavNode'>
            {route.routes ? (
                <div className='subnodes'>
                    <span className={'title '+(open ? 'open' : 'closed')} onClick={()=>setOpen(!open)}>{route.title}</span>
                    <ul>
                        {route.routes.map((subroute, i) => (
                            <NavNode key={id+'.'+i} route={subroute}/>
                        ))}
                    </ul>
                </div>
            ) : (
                <NavLink to={route.path} activeStyle={{ fontWeight: 'bold'}}>
                    {route.title}
                </NavLink>
            )}
        </li>
    )
}