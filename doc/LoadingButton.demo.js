import React , { Component } from "react"
import spreadProps from "react-spread-props"
import message from "face-message"
class Button extends Component {
    render() {
        const self = this
        let domProps = spreadProps(
            self.props,
            {
                onClick: function() {
                    const command = this
                    if (self.props.loading) {
                        command.stopTrigger()
                    }
                }
            }
        )
        return (
            <button {...domProps} />
        )
    }
}
class Example extends Component {
    render() {
        const self = this
        return (
            <div>
                <Button
                    loading={false}
                    onClick={() => {
                        message.info('点击了第一个按钮')
                    }}
                >click</Button>
                <hr/>
                <Button
                    loading={true}
                    onClick={() => {
                        message.info('点击事件不会触发')
                    }}
                >loading</Button>
            </div>
        )
    }
}
/*ONFACE-DEL*/Example = require('react-hot-loader').hot(module)(Example)
import ReactDOM from "react-dom"
ReactDOM.render(
    <Example />,
    document.getElementById('loadingbutton-demo')
)
