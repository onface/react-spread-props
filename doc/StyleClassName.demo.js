import React , { Component } from "react"
import spreadProps from "react-spread-props"
class Button extends Component {
    render() {
        const self = this
        let domProps = spreadProps(
            self.props,
            {
                style: {
                    backgroundColor: '#abcdef'
                },
                className: 'btn'
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
                <Button>default</Button>
                <hr/>
                <Button
                    style={{color: 'purple'}}
                >
                style: color: purple
                </Button>
                <hr/>
                <Button
                    className="btn--big"
                >
                className: btn--big
                </Button>
            </div>
        )
    }
}
/*ONFACE-DEL*/Example = require('react-hot-loader').hot(module)(Example)
import ReactDOM from "react-dom"
ReactDOM.render(
    <Example />,
    document.getElementById('styleClassName-demo')
)
