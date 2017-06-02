import React from 'react'
import update from 'immutability-helper'

import HallActions from '../alts/hall/hallActions'
import HallStore from '../alts/hall/hallStore'

class KitchenOrderComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: HallStore.getState().orders
        }
    }

    componentDidMount() {
        HallStore.listen(this.onChange)
    }


    componentWillUnmount() {
        HallStore.unlisten(this.onChange)
    }

    onChange=(updatestate)=> {
        this.setState({orders: updatestate.orders})
    }

    finishOrder = (index) => {
        HallActions.finishOrder(index)
    }

    render () {
        let getorders = HallStore.getState().orders
        let ordershows = []
        if (getorders.length > 0) {
            for (let i = 0; i < getorders.length; i++) {
                ordershows.push(
                    <div key={i}>
                    <h4>订单:</h4>
                    <ul style={{listStyle: "none"}}>
                    <li>鸡：{getorders[i].kitchencount}份</li>
                    <li>鸭：{getorders[i].duckcount}份</li>
                    <li>鱼：{getorders[i].fishcount}份</li>
                    <li>肉：{getorders[i].meatcount}份</li>
                    </ul>
                    <div>备注：{getorders[i].remarks}</div>
                    <div>订单总价: {getorders[i].totalprice}元</div>
                    <br />
                    <div>状态: {getorders[i].status}</div>
                    <button onClick={_ =>this.finishOrder(i)}>制作完成</button>
                    </div>
                    )
            }
        }
        return <div style={{float: "right"}}>
        {ordershows}
        </div>
    }
}

export default KitchenOrderComponent