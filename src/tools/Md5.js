import React, {useState} from 'react'
import './Md5.scss'
import md5 from 'md5'



export default function Md5Tool(){

    const [input, setInput] = useState('')
    const [mode, setMode] = useState('encode')
    const [multiline, setMultiline] = useState(true)


    return (
        <div className="Md5Tool Tool">
            <label className='input'>
                Input
                <textarea onChange={onInput} value={input} />
            </label>
            <div className='transition'>&#x21E9;</div>
            <div className="controls">
                <div className='control'>
                    <label>
                        <input type='radio' name='mode' onChange={modeSelect} value='encode' checked={mode === 'encode'}/>
                        Encode
                    </label>
                    <label>
                        <input type='radio' name='mode' onChange={modeSelect} value='decode' checked={mode === 'decode'}/>
                        Decode
                    </label>
                </div>
                <div className='control'>
                    <label>
                        <input type='radio' name='newlines' onChange={multilineSelect} value='multi' checked={multiline}/>
                        Multiline input
                    </label>
                    <label>
                        <input type='radio' name='newlines' onChange={multilineSelect} value='single' checked={!multiline}/>
                        One per line
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
        if(mode === 'encode'){
            if (multiline) {
                return md5(input)
            } else {
                return input.split('\n').map(line => md5(line)).join('\n')
            }
        }
        else{
            return 'not supported yet'
        }
    }

    function modeSelect(e){
        setMode(e.target.value)
    }

    function multilineSelect(e){
        setMultiline(e.target.value === 'multi')
    }

}
