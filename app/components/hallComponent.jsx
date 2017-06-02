import React from 'react'
import ReactDOM from 'react-dom'
import  {Link} from 'react-router'
import update from 'immutability-helper'

import Dishes from './dishes'
import HallActions from '../alts/hall/hallActions'
import OrderComponent from './orderComponent.jsx'
import WarehouseActions from '../alts/warehouse/warehouseActions'
import WarehouseStore from '../alts/warehouse/warehouseStore'

class HallComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            remarks: "",
            dishes: [{name: "", price: 0}],
            kitchencount: 0,
            duckcount: 0,
            fishcount: 0,
            meatcount: 0,
            totalprice: 0,
            status: "",
            salt: 0,
            sugar: 0,
            soysauce: 0,
            backgroundColor: "green",
            isDisabled: false 
        }
    }

    addDish = (name) => {
        let tempprice = 0
        let kitchennumber = 0
        let ducknumber = 0
        let fishnumber = 0
        let meatnumber = 0
        let newDish = update(this.state.dishes, {
            $push: [{
                name: name,
                price: Dishes[name].price
            }]
        })

        for (let item of newDish) {
            tempprice += item.price
        }
        for (let item of newDish) {
            if(item.name === "鸡") {
                kitchennumber++
            }
            else if(item.name === "鸭") {
                ducknumber++
            }
            else if(item.name === "鱼") {
                fishnumber++
            }
            if(item.name === "肉") {
                meatnumber++
            }
        }
        let saltcount = kitchennumber*2+ducknumber*2+fishnumber+meatnumber*2
        let sugarcount = kitchennumber+ducknumber+fishnumber*2+meatnumber*2
        let soysaucecount = kitchennumber+ducknumber*2+fishnumber*2+meatnumber*3
        if (saltcount > WarehouseStore.getState().salt) {
            newDish = update(this.state.dishes, {$splice: [[newDish.length-1,1]]})
            alert("盐不够！")
            this.setState({
                backgroundColor: "grey",
                isDisabled: true
            })
        }
        else if (sugarcount > WarehouseStore.getState().sugar) {
            newDish = update(this.state.dishes, {$splice: [[newDish.length-1,1]]})
            alert("糖不够！")
            this.setState({
                backgroundColor: "grey",
                isDisabled: true
            })
        }
        else if (soysaucecount > WarehouseStore.getState().soysauce) {
            newDish = update(this.state.dishes, {$splice: [[newDish.length-1,1]]})
            alert("酱油不够！")
            this.setState({
                backgroundColor: "grey",
                isDisabled: true
            })
        }
        else {
         this.setState({
            id: Date.now(),
            dishes: newDish,
            kitchencount: kitchennumber,
            duckcount: ducknumber,
            fishcount: fishnumber,
            meatcount: meatnumber,
            totalprice: tempprice,
            status: "未制作",
            salt: saltcount,
            sugar: sugarcount,
            soysauce: soysaucecount
        }) 
     }
 }

 deleteDish = (index) => {
    let tempindex = -1
    let newDish = []
    for (let i = 0; i < this.state.dishes.length; i++) {
        if(this.state.dishes[i].name === index) {
            tempindex = i
            break
        }
    }
    if (tempindex > -1) {
        newDish = update(this.state.dishes, {$splice: [[tempindex,1]]})
    }
    else {
        newDish = this.state.dishes
        alert("不能再少了！")
    }
    let tempprice = 0
    for (let item of newDish) {
        tempprice += item.price
    }
    let kitchennumber = 0
    let ducknumber = 0
    let fishnumber = 0
    let meatnumber = 0
    for (let item of newDish) {
        if(item.name === "鸡") {
            kitchennumber++
        }
        else if(item.name === "鸭") {
            ducknumber++
        }
        else if(item.name === "鱼") {
            fishnumber++
        }
        else if(item.name === "肉") {
            meatnumber++
        }
    }

    let saltcount = kitchennumber*2+ducknumber*2+fishnumber+meatnumber*2
    let sugarcount = kitchennumber+ducknumber+fishnumber*2+meatnumber*2
    let soysaucecount = kitchennumber+ducknumber*2+fishnumber*2+meatnumber*3

    this.setState({
        id: Date.now(),
        dishes: newDish,
        kitchencount: kitchennumber,
        duckcount: ducknumber,
        fishcount: fishnumber,
        meatcount: meatnumber,
        totalprice: tempprice,
        salt: saltcount,
        sugar: sugarcount,
        soysauce: soysaucecount,
        backgroundColor: "green",
        isDisabled: false 
    })
}

submitOrder = () => {
    console.log(WarehouseStore.getState().salt);
    HallActions.addOrder(this.state)
    WarehouseActions.consumeSalt(this.state.salt)
    WarehouseActions.consumeSugar(this.state.sugar)
    WarehouseActions.consumeSoysauce(this.state.soysauce)
    this.setState({
        id: 0,
        remarks: "",
        dishes: [{name: "", price: 0}],
        kitchencount: 0,
        duckcount: 0,
        fishcount: 0,
        meatcount: 0,
        totalprice: 0,
        status: "",
        salt: 0,
        sugar: 0,
        soysauce: 0
    })
}


render() {
    console.log(WarehouseStore.getState());
    return <div>
    <div style={{float: "left"}}>
    <Link to="/kitchen">去厨房</Link>
    <h1>同庆楼</h1>
    <h3>菜单</h3>
    <MenuShow addDish={this.addDish} buttonstatus={this.state.backgroundColor} isDisabled={this.state.isDisabled} />
    <ul style={{listStyle: "none", marginLeft: "-2.5rem"}}>
    <li>鸡点了{this.state.kitchencount}份
    <button onClick={_ =>this.deleteDish("鸡")}>取消一份</button>
    </li>
    <li>鸭点了{this.state.duckcount}份
    <button onClick={_ =>this.deleteDish("鸭")}>取消一份</button>
    </li>
    <li>鱼点了{this.state.fishcount}份
    <button onClick={_ =>this.deleteDish("鱼")}>取消一份</button>
    </li>
    <li>肉点了{this.state.meatcount}份
    <button onClick={_ =>this.deleteDish("肉")}>取消一份</button>
    </li>
    </ul>
    <div>订单总价：{this.state.totalprice}元</div>
    <br />
    <input onChange={(e) => this.setState({remarks: e.target.value})} placeholder="填写备注" />
    <br />
    <br />
    <button onClick={this.submitOrder}>提交订单</button>
    </div>
    <div>
        <ul>
            <li>盐：还剩{WarehouseStore.getState().salt-this.state.salt}</li>
            <li>糖：还剩{WarehouseStore.getState().sugar-this.state.sugar}</li>
            <li>酱油：还剩{WarehouseStore.getState().salt-this.state.soysauce}</li>
        </ul>
    </div>
    <OrderComponent />
    </div>
}
}

const MenuShow = function ({addDish,buttonstatus,isDisabled}) {
    let shows = []
    for (let key in Dishes) {
        shows.push(
            <div key={key}>
            {`${key}: ${Dishes[key].price}元`}
            <button disabled={isDisabled} style={{backgroundColor: buttonstatus}} onClick={_ =>addDish(key)}>点一份</button>
            </div>
            )
    }
    return (
        <div>
        {shows}
        </div>
        )
}


export default HallComponent