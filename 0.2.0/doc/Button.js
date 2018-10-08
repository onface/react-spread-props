import React , { Component } from "react"
import spreadProps from "react-spread-props"
class Button extends Component {
    constructor (props) {
        super(props)
        const self = this
        self.state = {
            count: 0
        }
    }
    handleClickButton = (e) => {
        self.setState({
            count: self.state.count + 1
        }, function () {
            if (self.state.count > 3) {
                if (self.props.onGreaterThree) {
                    self.props.onGreaterThree()
                }
            }
        })
    }
    render() {
        const self = this
        let domProps = spreadProps(
            self.props,
            { onClick: handleClickButton }
        )
        return (
            <button {...domProps} >{self.state.count}</button>
        )
    }
}
export default Button
