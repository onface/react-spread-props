import ReactDOM from "react-dom"
import GeneralButton from "./GeneralButton.js"
ReactDOM.render(
    (
        <div>
            <GeneralButton style={{border: '1px solid red'}} />
            传递样式
            <hr/>

            <GeneralButton onClick={(e) => {
                console.log('既可以触发递增，也可以触发用户绑定的 onClick')
            }} />
            绑定 onClick
            <hr/>
            <GeneralButton onGreaterThree={() => {
                console.log('大于3')
            }} />
            大于3时回调
        </div>
    ),
    document.getElementById('intro-genneral-button-node')
)
