import React , { Component } from "react"
class GeneralButton extends Component {
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
            <button
                {...self.props}
                onClick={(e) => {
                    if (self.props.onClick) {
                        self.props.onClick(e)
                    }
                    self.setState({
                        count: self.state.count + 1
                    }, function () {
                        if (self.state.count > 3) {
                            if (self.props.onGreaterThree) {
                                self.props.onGreaterThree()
                            }
                        }
                    })
                }}
            >{self.state.count}</button>
        )
    }
}
export default GeneralButton
