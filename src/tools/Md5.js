import React, {useState} from 'react'
import './Md5.scss'
import md5 from 'md5'



export default function Md5Tool(){

    const [input, setInput] = useState('')
    const [mode, setMode] = useState('encode')


    return (
        <div className="Md5Tool Tool">
            <label className='input'>
                Input
                <textarea onChange={onInput} value={input} />
            </label>
            <div className='transition'>&#x21E9;</div>
            <div className="controls">
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
            </div>
            <div className='transition'>&#x21E9;</div>
            <label className='output'>
                Output
                <textarea readOnly={true} value={solve()} />
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
