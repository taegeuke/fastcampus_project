import { useMemo } from "react"
import useActions from "../hooks/useActions"
import useOrders from "../hooks/useOrders"
import usePrototypes from "../hooks/usePrototypes"

export default function Orders() {
    const orders = useOrders()
    const prototypes = usePrototypes()
    const { remove } = useActions();
    const { removeAll } = useActions();
    const totalPrice = useMemo(() => {
        return orders
            .map((order) => {
                const { id, quantity } = order
                const prototype = prototypes.find((p) => p.id === id)
                return prototype.price * quantity
        })
        .reduce((l, r) => l + r, 0)
    }, [orders, prototypes])
    console.log(orders)
    
    if (orders.length === 0) {    
        return (
            <aside>
                <div className ="empty">
                    <div className="title">You dont' have any orders</div>
                    <div className="subtitle">Click on a + to add an order</div>
                </div>
            </aside>
        )
    }
    return (
        <div className="order">
            <aside>
            <div className="body">
            {orders.map(order => {
                const { id } = order
                const prototype = prototypes.find(p => p.id === id)
                const click = () => {
                    remove(id)
                }
                return(
                    <div className="item" key={id}>
                        <div className="img">
                            <video src={prototype.thumbnail}></video>
                        </div>
                        <div className="content">
                        <p className="title">
                            {prototype.title} x {order.quantity}
                        </p>    
                        </div>
                        <div className="action">
                        <p className="price">$ {prototype.price} * {order.quantity}</p>    
                        <button className="btn btn--link" onClick={click}>
                            <i className="icon icon--cross" />                        
                        </button>
                        </div>
                    </div>
                )
            })}    
            </div>
            <div className="total">
                <hr />
                <div className="item">
                    <div className="content">Total</div>
                    <div className="action">
                        <div className="price">${totalPrice}</div>
                    </div>
                    <button className="btn btn--link" onClick={removeAll}>
                        <i className="icon icon--delete"></i>
                    </button>
                </div>
                <button className="btn btn--secondary" style={{width: "100%", marginTop: 10}}>
                    Checkout
                </button>
            </div>
            </aside>
        </div>
    )
}