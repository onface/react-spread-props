import debug from "debug"
const log = debug('react-spread-props')
import possibleStandardNames from "./possibleStandardNames"
import extend from "safe-extend"
import eventName from "./eventName"
const eventNameKeys = Object.keys(eventName)
const nameKeys = Object.keys(possibleStandardNames)
// Object.values is es7
const reactNameKeys = nameKeys.map((key) => possibleStandardNames[key])
const allKeys = nameKeys.concat(reactNameKeys)


function reactSpreadProps (props, proxyProps) {
    log('props', props)
    log('proxyProps', proxyProps)
    proxyProps = extend(true, {}, proxyProps)
    let domProps = extend.clone(props)
    Object.keys(proxyProps).forEach(function (proxyKey) {
        let proxyValue = proxyProps[proxyKey]
        switch(typeof proxyValue) {
            case 'string':
                domProps[proxyKey] = typeof domProps[proxyKey] !== 'undefined'? domProps[proxyKey]: ''
                if(proxyKey === 'className') {
                    log('props.className', domProps[proxyKey])
                    log('proxyProps.className', proxyValue)
                    domProps[proxyKey] = proxyValue + ' ' + domProps[proxyKey]
                    log('merged className', domProps[proxyKey])
                }
                else {
                    log(`domProps["${proxyKey}"] = "${proxyValue}" + ${domProps[proxyKey]}`)
                    domProps[proxyKey] = proxyValue + domProps[proxyKey]
                }
            break
            case 'function':
                let userEvent = domProps[proxyKey] || function () {}
                domProps[proxyKey] = function (...arg) {
                    let command =  {
                        stopTriggerSwitch: false
                    }
                    command.stopTrigger = function () {
                        log('stopTrigger', proxyValue)
                        command.stopTriggerSwitch = true
                    }
                    proxyValue.apply(command, arg)
                    if (!command.stopTriggerSwitch) {
                        userEvent.apply({}, arg)
                    }
                }
            break
            case 'object':
                if (Array.isArray(proxyValue)) {
                    log('concat proxyValue', proxyValue, domProps[proxyKey])
                    domProps[proxyKey] = proxyValue.concat(domProps[proxyKey])
                }
                else {
                    log('extend proxyValue', proxyValue, domProps[proxyKey])
                    domProps[proxyKey] = extend(true, proxyValue, domProps[proxyKey])
                }
            break
            default:
                log('set proxyKey', `domProps["${proxyKey}"] = ${proxyValue}`)
                domProps[proxyKey] = proxyValue
        }
    })
    let propsKeys = Object.keys(domProps)
    let unknownKeys = propsKeys.filter(function (key) {
        if (eventNameKeys.includes(key)) {
            log(`${key} is passed`)
            return false
        }
        if (allKeys.includes(key)) {
            if (!reactNameKeys.includes(key)) {
                // domProps['className'] = props['class']
                domProps[possibleStandardNames[key]] = props[key]
                delete domProps[key]
                console.warn(`react-spread-props(npm): \r\n\t"${key}" converted to "${possibleStandardNames[key]}" \r\n\t You should use "${possibleStandardNames[key]}!"`)
            }
        }
        else {
            log('filter key', key)
            return true
        }
    })
    log('unknownKeys', unknownKeys)
    unknownKeys.forEach(function (key) {
        delete domProps[key]
    })
    return domProps
}

module.exports = reactSpreadProps
