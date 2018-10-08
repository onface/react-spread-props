import React , { Component } from "react"
import spreadProps from "react-spread-props"
import message from "face-message"
class Button extends Component {
    render() {
        const self = this
        let domProps = spreadProps(
            self.props,
            {
                onClick: () => {
                    self.props.onChange()
                }
            }
        )
        return (
            <button {...domProps} >{self.props.value}</button>
        )
    }
}
class Example extends Component {
    constructor (props) {
        super(props)
        const self = this
        self.state = {
            count: 0
        }
    }
    render() {
        const self = this
        return (
            <Button
                value={self.state.count}
                onChange={() => {
                    self.setState({
                        count: self.state.count + 1
                    })
                }}
                onClick={() => {
                    message.info('clicked')
                }}
            />
        )
    }
}
/*ONFACE-DEL*/Example = require('react-hot-loader').hot(module)(Example)
import ReactDOM from "react-dom"
ReactDOM.render(
    <Example />,
    document.getElementById('onClick-demo')
)
