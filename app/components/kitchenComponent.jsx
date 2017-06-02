import React from 'react'
import  {Link} from 'react-router'

import HallStore from '../alts/hall/hallStore'
import KitchenOrderComponent from './kitchenOrderComponent.jsx'
import WarehouseActions from '../alts/warehouse/warehouseActions'
import WarehouseStore from '../alts/warehouse/warehouseStore'

class KitchenComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: HallStore.getState().orders,
            salt: WarehouseStore.getState().salt,
            sugar: WarehouseStore.getState().sugar,
            soysauce: WarehouseStore.getState().soysauce
        }
    }

    componentDidMount() {
        HallStore.listen(this.onChange)
        WarehouseStore.listen(this.onChangeGoods)
    }

    componentWillUnmount() {
        HallStore.unlisten(this.onChange)
        WarehouseStore.unlisten(this.onChangeGoods)
    }

    onChange = (state)=> {
        this.setState({orders: state.orders})
    }

    onChangeGoods = (index) => {
        this.setState({
            salt: index.salt,
            sugar: index.sugar,
            soysauce: index.soysauce
        })
    }

    addSalt = () => {
        let temp = this.state.salt+1
        this.setState({salt: temp})
        WarehouseActions.addSalt(temp)
        console.log(this.state.salt);
    }

    addSugar = () => {
        let temp = this.state.sugar+1
        this.setState({sugar: temp})
        WarehouseActions.addSugar(temp)
    }

    addSoysauce = () => {
        let temp = this.state.soysauce+1
        this.setState({soysauce: temp})
        WarehouseActions.addSoysauce(temp)
    }

    render() {
        console.log(this.state.orders);
        if(this.state.orders.length === 0) {
            return <div>
                <Link to="/hall">去餐厅</Link>
                <h4>订单为空</h4>
                <div>
                <h4>补货</h4>
                <ul>
                    <li>盐: {this.state.salt}<button onClick={this.addSalt}>补货</button></li>
                    <li>糖: {this.state.sugar}<button onClick={this.addSugar}>补货</button></li>
                    <li>酱油: {this.state.soysauce}<button onClick={this.addSoysauce}>补货</button></li>
                </ul>
                </div>
            </div>
        }
        else {
            return <div>
            <Link to="/hall">去餐厅</Link>
            <h1>厨房</h1>
            <div>
                <KitchenOrderComponent />
                <br />
                <div style={{margin: "0 auto"}}>
                <h4>补货</h4>
                <ul>
                    <li>盐: {this.state.salt}<button onClick={this.addSalt}>补货</button></li>
                    <li>糖: {this.state.sugar}<button onClick={this.addSugar}>补货</button></li>
                    <li>酱油: {this.state.soysauce}<button onClick={this.addSoysauce}>补货</button></li>
                </ul>
                </div>
            </div>
            </div>
        }
    }
}

export default KitchenComponent