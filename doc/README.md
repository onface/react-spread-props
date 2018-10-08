# 示例

务必先阅读 [intro](./intro.md) 后查看示例。

````js
// Start debugging
localStorage.debug = 'react-spread-props'
````

## proxyEvent

最常见的基于代理事件自定义事件

````code
{
    title: '代理点击事件',
    desc: '点击按钮时候触发 onChange, 通过 onChange 递增数字。',
    html: '<div id="onClick-demo"></div>',
    source: './MountButton.demo.js',
    js: './MountButton.demo.js',
    horiz: false,
    open: true
}
````

## style&className

合并 style 和 className

````css
.btn {
    border:1px solid skyblue;
}
.btn--big {
    font-size: 2em;
}
````

````code
{
    title: '合并 style 和 className',
    desc: '',
    html: '<div id="styleClassName-demo"></div>',
    source: './StyleClassName.demo.js',
    js: './StyleClassName.demo.js',
    horiz: true,
    open: false
}
````

## stopTrigger

在代理事件中控制用户绑定事件触发条件

````code
{
    title: 'Loadding button',
    desc: '`loading` 为 `true` 时 `onClick` 不会触发',
    html: '<div id="loadingbutton-demo"></div>',
    source: './LoadingButton.demo.js',
    js: './LoadingButton.demo.js',
    horiz: true,
    open: false
}
````
