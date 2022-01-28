import './FormComponent.css'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
function FormComponent(props) {

    //สร้างฟังชั่น state ชื่อ setTitle, setAmount
    const [title, setTitle] = useState('') //title คือชื่อstate, setTitle คือชื่อฟังชั่น และ useState คือกำหนดค่าเริ่มต้น (title = '') 
    const [amount, setAmount] = useState(0) //amount คือชื่อstate, setAmount คือชื่อฟังชั่น และ useState คือกำหนดค่าเริ่มต้น (amount = 0)
    const [formValid, setFormValid] = useState(false) //สร้าง state  formValid เป็น false
    function inputTitle(event) { /*onChange={inputTitle} ทำงานเมื่อมีค่าเปลี่ยนเแปลง*/
        setTitle(event.target.value) //เข้าถึงค่าจาก textbox โดยใช้คำสั่ง event.target.value จากนั้นโยนค่าไปใส่ฟังชั่น setTitle หลังจากนั้น state title จะมีค่าเท่ากับ event.target.value
    }
    function inputAmount(event) {  /*onChange={inputAmount} ทำงานเมื่อมีค่าเปลี่ยนเแปลง*/
        setAmount(event.target.value)
    }
    function saveItem(event) {
        event.preventDefault()//ไม่ให้ข้อมูลรีเฟรช
        const itemData = {
            id: uuidv4(),
            title: title,
            amount: Number(amount)
        }
        props.onAddItem(itemData)
        setTitle('')
        setAmount(0)
    }
    useEffect(() => { //จะถูกเรียกใช้เมื่อมีการ reRender Component ของเรา
        const checkData = title.trim().length > 0 && amount !== 0 // check title ไม่เป็นช่องว่าง และ amount !=0       
        setFormValid(checkData) //ถ้า checkdata เป็นจริง ให้ setFomValid เป็นจริง

    }, [title, amount]) //ระบุ array state ที่ต้องการดักจับ
    return (
        <div>
            <form onSubmit={saveItem}>
                <div className="form-control">
                    <label>ชื่อรายการ</label>
                    <input type="text" placeholder="ระบุชื่อรายการ" onChange={inputTitle} value={title} />
                </div>
                <div className="form-control">
                    <label>จำนวนเงิน</label>
                    <input type="number" placeholder="(+ รายรับ , - รายจ่าย)" onChange={inputAmount} value={amount} />
                </div>
                <div>
                    <button type="summit" className="btn" disabled={!formValid}>เพิ่มข้อมูล</button>
                </div>
            </form>
        </div>
    )
}
export default FormComponent