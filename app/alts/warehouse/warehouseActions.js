import Alt from "../../altflux.js"

class WarehouseActions {
    consumeSalt (saltcount) {
        return saltcount
    }
    consumeSugar (saltcount) {
        return saltcount
    }
    consumeSoysauce (saltcount) {
        return saltcount
    }
    deleteConsume(salttemp,sugartemp,soysaucetemp) {
        return {salttemp,sugartemp,soysaucetemp}
    }
    addSalt(temp1) {
        return temp1
    }
    addSugar(temp2) {
        return temp2
    }
    addSoysauce(temp3) {
        return temp3
    }
}

export default Alt.createActions(WarehouseActions)