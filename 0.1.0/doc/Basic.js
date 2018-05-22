var React = require('react')
var propTypes = require('prop-types')
var spreadProps = require('react-spread-props')
class Button extends React.Component {
    constructor (props) {
        super(props)
        const self = this
        self.state = {

        }
    }
    render() {
        const self = this
        let domProps = spreadProps(
                self.props,
                {
                    className: 'btn',
                    style: {border: '1px solid skyblue'},
                    onClick: function (e) {
                        console.log('click btn')
                    },
                    onMouseDown: function (e) {
                        // 调用 stopTrigger 后
                        // <Button onMouseDown={} 的 onMouseDown 将不会触发
                        this.stopTrigger()
                    }
                },
                {
                    ignore: ['onClickCode']
                }
        )
        return (
            <div>
                <pre onClick={() => {
                    self.props.onClickCode()
                }} >{JSON.stringify(domProps, null, 4)}</pre>
                <button
                    type="button"
                    {...domProps}
                >[{self.props.children}]</button>
                <hr />
            </div>
        )
    }
}
Button.defaultProps = {
    onClickCode: () => {}
}
class Basic extends React.Component {
    render () {
        return (
            <div className="basicDemo" >
                <Button
                    onMouseEnter={() => {
                        console.log('onMouseEnter')
                    }}
                >
                    spread props
                </Button>
                <Button
                    formaction="/some"
                >
                    warn converted formAction
                </Button>
                <Button style={{color: 'red'}} >
                    style
                </Button>
                <Button className="some" >
                    className
                </Button>
                <Button onClick={(e) => {
                    console.log('click proxy btn')
                }} >
                    proxy
                </Button>
                <Button onMouseDown={(e) => {
                    console.log('This function will never execute.')
                }} >
                    stopTrigger
                </Button>

                <Button
                    onClickCode={function () {
                        console.log('click code')
                    }}
                >
                    click code
                </Button>
            </div>
        )
    }
}
/*ONFACE-DEL*/Basic = require("react-hot-loader").hot(module)(Basic)
module.exports = Basic