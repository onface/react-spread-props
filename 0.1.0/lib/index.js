import possibleStandardNames from "./possibleStandardNames"
import extend from "safe-extend"
import getDeafultSettings from "./getDeafultSettings"
const nameKeys = Object.keys(possibleStandardNames)
// Object.values is es7
const reactNameKeys = nameKeys.map((key) => possibleStandardNames[key])
const allKeys = nameKeys.concat(reactNameKeys)
function reactSpreadProps (props, extendProps, settings) {
    settings = extend(true, getDeafultSettings(), settings)
    extendProps = extend(true, {}, extendProps)
    let output = extend.clone(props)
    Object.keys(extendProps).forEach(function (extendKey) {
        let extendValue = extendProps[extendKey]
        switch(typeof extendValue) {
            case 'string':
                output[extendKey] = extendValue + ' ' + (output[extendKey] || '')
            break
            case 'function':
                let userEvent = output[extendKey] || function () {}
                output[extendKey] = function (...arg) {
                    let command =  {
                        stopTriggerSwitch: false
                    }
                    command.stopTrigger = function () {
                        command.stopTriggerSwitch = true
                    }
                    extendValue.apply(command, arg)
                    if (!command.stopTriggerSwitch) {
                        userEvent.apply({}, arg)
                    }
                }
            break
            case 'object':
                if (Array.isArray(extendValue)) {
                    output[extendKey] = extendValue.concat(output[extendKey])
                }
                else {
                    output[extendKey] = extend(true, extendValue, output[extendKey])
                }
            break
            default:
                output[extendKey] = extendValue
        }
    })
    let propsKeys = Object.keys(output)
    const EVENT_NAME_REGEX = /^on./
    let unknownKeys = propsKeys.filter(function (key) {
        if (settings.ignore.indexOf(key) !== -1) {
            return true
        }
        if (EVENT_NAME_REGEX.test(key)) {
            return false
        }
        let item = props[key]
        if (allKeys.indexOf(key) !== -1) {
            if (reactNameKeys.indexOf(key) == -1) {
                // output['className'] = props['class']
                output[possibleStandardNames[key]] = props[key]
                delete output[key]
                console.warn(`react-spread-props(npm): \r\n\t"${key}" converted to "${possibleStandardNames[key]}" \r\n\t You should use "${possibleStandardNames[key]}!"`)
            }
        }
        else {
            return true
        }
    })
    unknownKeys.forEach(function (key) {
        delete output[key]
    })
    return output
}

module.exports = reactSpreadProps
