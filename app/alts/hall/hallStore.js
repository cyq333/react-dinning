import update from 'immutability-helper'

import Alt from '../../altflux.js'
import HallActions from './hallActions'

class HallStore {
    constructor() {
        this.bindListeners({
            handleAddOrder: HallActions.addOrder,
            handleDeleteOrder: HallActions.deleteOrder,
            handleFinishOrder: HallActions.finishOrder,
            handlePayOrder: HallActions.payOrder
        })
        this.state = {
            orders: []
        }
    }

    handleAddOrder = (order) => {
        this.setState({
            orders: update(this.state.orders, {$push: [order]})
        })
    }

    handleDeleteOrder = (orderid) => {
        console.log(orderid);
        let index = -1
        for (let i = 0; i < this.state.orders.length; i++) {
            if(i === orderid) {
                index = i
                break
            }
        }
        if (index > -1) {
            this.setState({
                orders: update(this.state.orders, { $splice: [[index, 1]] })
            })
        }
    }

    handleFinishOrder = (orderindex) => {
        console.log(orderindex);
        console.log(this.state.orders[orderindex]);
        this.setState({
            orders: update(this.state.orders, {[orderindex]: {status: {$set: "已制作"}}})
        })
        let temporders = []
        for (let i = 0; i < this.state.orders.length; i++) {
            if (this.state.orders[i].status === "未制作") {
                temporders.push(this.state.orders[i])
            }
        }
        for (let i = 0; i < this.state.orders.length; i++) {
            if (this.state.orders[i].status === "已制作") {
                temporders.push(this.state.orders[i])
            }
        }
        for (let i = 0; i < this.state.orders.length; i++) {
            if (this.state.orders[i].status === "已支付") {
                temporders.push(this.state.orders[i])
            }
        }
        this.setState({
            orders: temporders
        })
    }

    handlePayOrder = (orderitem) => {
        this.setState({
            orders: update(this.state.orders, {[orderitem]: {status: {$set: "已支付"}}})
        })
        let temporders = []
        for (let i = 0; i < this.state.orders.length; i++) {
            if (this.state.orders[i].status === "未制作") {
                temporders.push(this.state.orders[i])
            }
        }
        for (let i = 0; i < this.state.orders.length; i++) {
            if (this.state.orders[i].status === "已制作") {
                temporders.push(this.state.orders[i])
            }
        }
        for (let i = 0; i < this.state.orders.length; i++) {
            if (this.state.orders[i].status === "已支付") {
                temporders.push(this.state.orders[i])
            }
        }
        this.setState({
            orders: temporders
        })
    }
}

export default Alt.createStore(HallStore, 'HallStore')