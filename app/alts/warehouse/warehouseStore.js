import update from 'immutability-helper'

import Alt from '../../altflux.js'
import HallStore from '../hall/hallStore'
import WarehouseActions from './warehouseActions'

class WarehouseStore {
    constructor() {
        this.bindListeners({
            handleConsumeSalt: WarehouseActions.consumeSalt,
            handleConsumeSugar: WarehouseActions.consumeSugar,
            handleConsumeSoysauce: WarehouseActions.consumeSoysauce,
            handleDeleteConsume: WarehouseActions.deleteConsume,
            handleAddSalt: WarehouseActions.addSalt,
            handleAddSugar: WarehouseActions.addSugar,
            handleAddSoysauce: WarehouseActions.addSoysauce
        })
        this.state = {
            salt: 20,
            sugar: 20,
            soysauce: 20
        }
    }

    handleConsumeSalt = (saltcount) => {
        let temp = this.state.salt - saltcount
        this.setState({
            salt: temp
        })
    }

    handleConsumeSugar = (sugarcount) => {
        let temp = this.state.sugar - sugarcount
        this.setState({
            sugar: temp
        })
    }

    handleConsumeSoysauce = (soysaucecount) => {
        let temp = this.state.soysauce - soysaucecount
        this.setState({
            soysauce: temp
        })
    }

    handleDeleteConsume = (salttemp,sugartemp,soysaucetemp) => {
        let saltxx = this.state.salt + salttemp
        let sugarxx = this.state.salt + sugartemp
        let soysaucexx = this.state.salt + soysaucetemp
        this.setState({
            salt: saltxx,
            sugar: sugarxx,
            soysauce: soysaucexx
        }) 
    }

    handleAddSalt = (temp) => {
        this.setState ({
            salt: temp
        })
    }

    handleAddSugar = (temp) => {
        this.setState ({
            sugar: temp
        })
    }

    handleAddSoysauce = (temp) => {
        this.setState ({
            soysauce: temp
        })
    }
}

export default Alt.createStore(WarehouseStore, 'WarehouseStore')