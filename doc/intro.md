# 指引

> 使用一个组件或模块之前，应当知道它能解决的问题是什么，不能解决的问题是什么。使用的最佳实践是什么？

`react-spread-props` 专门解决日常开发中传递 `props` 的同时代理绑定事件的需求。

例如开发一个检测用户点击后递增计数的组件：

````code
{
    title: '计数按钮',
    desc: '',
    html: '',
    source: './GeneralButton.js',
    horiz: false,
    open: true
}
````

使用计数按钮

````code
{
    title: '调用计数按钮',
    desc: '',
    html: '<div id="intro-genneral-button-node"></div>',
    js: './Intro.GeneralButton.demo.js',
    source: './Intro.GeneralButton.demo.js',
    horiz: false,
    open: true
}
````

观察控制台会看见报错

```shell
Warning: Unknown event handler property `onGreaterThree`. It will be ignored.
```

因为传递 `props` 的同时代理用户绑定事件的实现代码是：

```js
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
```

因为 `{...self.props}` 传递了 `onGreaterThree` 所以会报错。想要不传递 `onGreaterThree` 就要过滤 `onGreaterThree`

```js
var spreadProps = Object.assign({}, self.props.props)
var ignoreProps = ['onGreaterThree']
Object.keys(spreadProps).filter(function (key) {
    return ignoreProps.includes(key)
})
// 然后传递 spreadProps
{...spreadProps}
```

至此实现了传递 `props` 的同时代理绑定事件的需求。

因为开发组件过程中需要做 react spread props 的操作太多了，所以将实现过程封装成函数能提高开发效率。

````code
{
    title: '使用 react-spread-props 的按钮',
    desc: '',
    html: '',
    source: './Button.js',
    horiz: false,
    open: true
}
````

语法: `spreadProps(props, proxyProps)`

实现功能与 `<GeneralButton />` 但代码更少更易读。(因为 `onGreaterThree` 不属于 DOM 事件，所以会被自动过滤)

## style&className

`props.style` 和 `props.className` 将与 `proxyProps.style` 和 `proxyProps.className` 自动合并。

[示例代码](./README.md#style&className)

## stopTrigger

你还可以在 `proxyProps.onClick` 中控制 `props.onClick` 触发条件。

```js
let domProps = spreadProps(
    self.props,
    {
        onClick: function (){
            // do somethings
            this.stopTrigger()
        }
    }
)
```

```js
<Button onClick={() => {
    console.log('因为 this.stopTrigger 用户绑定的 onClick 将不会被触发')
}} />
```

[示例代码](./README.md#stopTrigger)

## 新的属性

万一 `react-spread-props` 错误的将一些新的 DOM 属性过滤了请及时[通知我们](https://github.com/onface/react-spread-props/issues/new)

你也可以先通过单独传递的方式解决这种意外情况。

```js
<button
    {...domProps}
    futureAttr="Future unpredictable dom attributes"
>
</button>
```
