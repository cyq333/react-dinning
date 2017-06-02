import Alt from "../../altflux.js"

class HallActions {
    addOrder(order) {
        return order
    }
    deleteOrder(orderid) {
        return orderid
    }
    finishOrder(orderindex) {
        return orderindex
    }
    payOrder(orderitem) {
        return orderitem
    }
}

export default Alt.createActions(HallActions)