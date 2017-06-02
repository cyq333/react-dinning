import React from 'react'
import update from 'immutability-helper'
import AjaxGet from '../libs/ajaxGet'
import AjaxSend from '../libs/ajaxSend'

import HallActions from '../alts/hall/hallActions'
import HallStore from '../alts/hall/hallStore'
import WarehouseActions from '../alts/warehouse/warehouseActions'

class OrderComponent extends React.Component {
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

    deleteOrder = (index) => {
        if (this.state.orders[index].status === "已制作") {
            alert("订单已制作 ，不能取消！")
        }
        else if (this.state.orders[index].status === "已支付") {
            alert("订单已支付 ，不能取消！")
        }
        else {
            WarehouseActions.deleteConsume(this.state.orders[index].kitchencount*2+this.state.orders[index].duckcount*2+this.state.orders[index].fishcount+this.state.orders[index].meatcount*2,this.state.orders[index].kitchencount+this.state.orders[index].duckcount+this.state.orders[index].fishcount*2+this.state.orders[index].meatcount*2,this.state.orders[index].kitchencount+this.state.orders[index].duckcount*2+this.state.orders[index].fishcount*2+this.state.orders[index].meatcount*3)
            HallActions.deleteOrder(index)
        }
    }

    payOrder = (index, kitchenCount, duckCount, fishCount, meatCount, remark, price) => {
        if (this.state.orders[index].status === "未制作") {
            alert("该订单还没有制作")
        }
        else if (this.state.orders[index].status === "已支付") {
            alert("该订单已支付")
        }
        else {
            HallActions.payOrder(index)
            AjaxSend("POST", "/api/orderRecords", {dishes: [{name: chicken, count: kitchenCount}, {name: duck, count: duckCount}, {name: fish, count: fishCount}, {name: meat, count: meatCount}], ramark: ramark, totalPrice: price}, (res) => {
            if (res.errno) {
                console.log(res)
            }
        })
        }  
    }

    render() {
        let temporders = HallStore.getState().orders
        let ordershows = []
        if (temporders.length > 0) {
            for (let i = 0; i < temporders.length; i++) {
                ordershows.push(
                    <div key={i}>
                    <h3>订单:</h3>
                    <ul style={{listStyle: "none"}}>
                    <li>鸡：{temporders[i].kitchencount}份</li>
                    <li>鸭：{temporders[i].duckcount}份</li>
                    <li>鱼：{temporders[i].fishcount}份</li>
                    <li>肉：{temporders[i].meatcount}份</li>
                    </ul>
                    <div>备注：{temporders[i].remarks}</div>
                    <div>订单总价: {temporders[i].totalprice}元</div>
                    <br />
                    <div>状态: {temporders[i].status}</div>
                    <button onClick={_ =>this.deleteOrder(i)}>取消订单</button>
                    <button onClick={_ =>this.payOrder(i, kitchencount, duckcount, fishcount, meatcount, temporders[i].remarks, temporders[i].totalprice)}>完成订单</button>
                    </div>
                    )
            }
        }
        return <div style={{float: "right"}}>
        {ordershows}
        </div>
    }
}

export default OrderComponent