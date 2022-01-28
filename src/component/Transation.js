import Item from "./Item"
import './Transaction.css'

function Transactions(props) {
    const { items } = props
    return (
        <div>
            <ul className="item-list">
                {items.map((element) => {
                    //  return <Item title={element.title} amount={element.amount} /> // array map
                    return <Item {...element} key={element.id} /> //ส่งค่าทั้งหมดใน element ประกอบด้วย title, amount key
                })}
            </ul>

        </div>

    )
}
export default Transactions