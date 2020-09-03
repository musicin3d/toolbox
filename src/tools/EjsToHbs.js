import React, {useState} from 'react'
import './EjsToHbs.scss';
import {Template} from 'ejs/lib/ejs'


export default function EjsToHbs(){

    const [input, setInput] = useState('')

    return (
        <div className="Tool EjsToHbs">
            <label className='input'>
                Input
                <textarea onChange={onInput} value={input} />
            </label>
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

        // parse EJS
        const t = new Template(input)
        t.generateSource()
        let lines = t.source.split('\n    ; ')
        lines[0] = lines[0].replace(/^ {4}; /, '')

        // translate to printable statements
        const parser = new EjsParser()
        lines = lines.map(line => parser.parse(line))

        const result = lines.filter(line => line.length)
        console.log(result)
        return result.join('')
    }

}



class EjsParser {

    #blocks = []

    parse(line){
        line = line.trim()

        const startsWith = {
            'if': this._readIf,
            '__append': this._readAppend,
            '__line': ()=>'',
            '}': this._readEnd
        }
        const contains = {
            '.each(': this._readEach
        }

        for(const keyword in startsWith){
            if(line.startsWith(keyword))  return startsWith[keyword].call(this, line)
        }
        for(const keyword in contains){
            const index = line.indexOf(keyword)
            if(index >= 0)  return contains[keyword].call(this, line, index)
        }

        return `{{ ${line} }}`
    }


    _readIf(line){
        let [first, last] = this._findBrackets(line)
        if(last === -1)  last = line.length
        const inside = line.substring(first+1, last)
        const outside = line.substring(last+1)

        let result = `{{#if ${inside}}}`

        // has body
        if(outside.trim()){
            // body is bracketed
            if(outside.trim().charAt(0) === '{'){
                [first, last] = this._findBrackets(outside, 0, '{}')
                // body is complete
                if(last > -1){
                    //TODO handle ugly inlined else statement
                    const body = outside.substring(first+1, last)
                    const extra = outside.substring(last+1)
                    result += `${body}{{/if}}${extra}`
                }
                // body is incomplete
                else {
                    result += outside.substring(first+1)
                    this._pushBlock('if')
                }
            }
            // body is inline or unrecognizable
            else {
                result += outside
            }
        }


        return result
    }


    _readElse(line, index){
        const outside = line.substring(index+4).trim()

        let result = `{{else}}`

        // has body
        if(outside.trim()){
            // body is bracketed
            if(outside.trim().charAt(0) === '{'){
                const [first, last] = this._findBrackets(outside, 0, '{}')
                // body is complete
                if(last > -1){
                    const body = outside.substring(first+1, last)
                    const extra = outside.substring(last+1)
                    result += `${body}{{/if}}${extra}`
                    // console.log("open+close else block")
                }
                // body is incomplete
                else {
                    result += outside.substring(first+1)
                    this._pushBlock('else')
                    // console.log("open else block")
                }
            }
            // body is inline or unrecognizable
            else {
                result += outside
                // console.log("inline else block")
            }
        }

        return result
    }


    _readEach(line, index){
        const subject = line.substring(0, index)
        this._pushBlock('each')
        return `{{#each ${subject}}}`
    }


    _readEnd(line){
        const block = this._popBlock()
        if(typeof block == 'undefined')  throw new Error("Unmatched closing bracket in: "+line)
        switch (block) {
            case 'each':
                if(!/^} *\)$/.test(line))  throw new Error("Improperly closed each block in: "+line)
                return `{{/each}}`
            case 'if':
                if(line !== '}'){
                    if(!/^} *else *{$/.test(line))  throw new Error("Improperly closed if block in: "+line)
                    return this._readElse(line, line.indexOf('else'))
                }
                return '{{/if}}'
            case 'else':
                if(line !== '}')  throw new Error("Improperly closed else block in: "+line)
                return '{{/if}}'
            default:  throw new Error(`Block "${block}" not fully implemented`)
        }
    }


    _readAppend(line){
        const [first, last] = this._findBrackets(line)
        const inside = line.substring(first+1, last)
        // print string
        if(inside.startsWith('"')){
            try{
                // eslint-disable-next-line no-new-func
                return (new Function('return '+inside))()
            } catch (e){}
        }
        // wrap helper/unrecognizable/un-eval-able
        return `{{${inside}}}`
    }


    _findBrackets(str, start = 0, brackets = '()'){
        const [opener, closer] = brackets
        let open = 0
        let first = -1
        let last = -1
        // eslint-disable-next-line no-cond-assign
        for(let i=start, c=''; c=str.charAt(i); i++){
            if(c === opener){
                open++
                if(first === -1)  first = i
            }
            else if(c === closer){
                if(open === 0)  throw new Error('Unmatched closing parenthesis in: '+str)
                open--
                if(open === 0)  last = i
            }
        }
        return [first, last]
    }


    _pushBlock(keyword){
        this.#blocks.push(keyword)
    }

    _popBlock(){
        return this.#blocks.pop()
    }

}
