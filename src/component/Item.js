import PropTypes from 'prop-types';
// import { useContext } from 'react';
import './Item.css'

function Item(props) { //สร้างตัวแปร props เป็น Propertie รับค่าจาก Compoment ที่เรียกใช้
    const { title, amount } = props //กำหนดค่า ให้กับ props
    const status = amount < 0 ? "expense" : "income" //เช็ค ค่า amont โดยใช้ ? "true" : "false"
    const symbol = amount < 0 ? "-" : "+"
    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    return (
        <li className={status}>{title} <span>{symbol}{formatNumber(Math.abs(amount))}</span> </li> // Math.abs ทำให้ ค่าที่เป็นลบเป็นลบเสมอ
        
    )
}

Item.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
}
export default Item