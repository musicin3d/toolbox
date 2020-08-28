import React, {useState} from 'react'
import './md5.scss'
import md5 from 'md5'



export default function Md5Tool(){

    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [mode, setMode] = useState('encode')


    return (
        <div className="Md5Tool">
            <label>
                Input
                <textarea className='input' onChange={onInput} value={input} />
            </label>
            <div className='mode'>
                <label>
                    <input type='radio' name='mode' onChange={modeSelect} value='encode' checked={mode === 'encode'}/>
                    Encode
                </label>
                <label>
                    <input type='radio' name='mode' onChange={modeSelect} value='decode' checked={mode === 'decode'}/>
                    Decode
                </label>
            </div>
            <label>
                Output
                <textarea className='output' readOnly={true} value={solve()} />
            </label>
        </div>
    )


    function onInput(e){
        setInput(e.target.value)
    }

    function solve(){
        if(!input)  return ''
        if(mode === 'encode')  return md5(input)
        else                   return 'not supported yet'
    }

    function modeSelect(e){
        setMode(e.target.value)
    }

}
