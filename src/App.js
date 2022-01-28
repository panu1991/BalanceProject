import Transactions from "./component/Transation";
import './App.css'
import FormComponent from "./component/FormComponent";
import { useState, useEffect } from "react";
import DataContext from "./data/DataContext"; 
import ReportComponent from "./component/ReportComponent";
import { BrowserRouter as Rounter, Switch, Route, Link } from "react-router-dom";


function App() {
  const design = { color: 'red', textAlign: 'center', fontSize: '1.5rem' }
  // const initState = [
  //   { id: 1, title: "ค่าเช่าบ้าน", amount: -2000 },
  //   { id: 2, title: "เงินเดือน", amount: 12000 },
  //   { id: 3, title: "ค่าเดินทาง", amount: -2500 },
  //   { id: 4, title: "ขายของ", amount: 2000 }  //
  // ]
  
  const [items, setItems] = useState([])
  const [reportIncome, setReportIncome] = useState(0)
  const [reportExpense, setReportExpense] = useState(0)


  const onAddnewItem = (newItem) => {
    setItems((prevItem) => {
      return [newItem, ...prevItem]
    })
  }
  useEffect(() => { //ดักจับข้อมูลของ state Item ถ้ามีการเปลี่ยนแปลง
    const amounts = items.map(items => items.amount)
    const income = amounts.filter(element => element > 0).reduce((total, element) => total += element, 0)
    const expense = (amounts.filter(element => element < 0).reduce((total, element) => total += element, 0)) * -1
    setReportExpense(expense.toFixed(2))
    setReportIncome(income.toFixed(2))
  }, [items, reportExpense, reportIncome])
  // const [showreport, setShowreport] = useState(false)
  // //reducer state
  // const reduce = (state, action) => {
  //   switch (action.type) {
  //     case "SHOW": return setShowreport(true)
  //     case "HIDE": return setShowreport(false)
  //   }
  // }
  // const [result, dispath] = useReducer(reduce, showreport)
  return (
    <DataContext.Provider value={{ income: reportIncome, expense: reportExpense }}>
      <div className="container">
        <h1 style={design}>โปรแกรมบัญชีรายรับ-รายจ่าย</h1>
        <Rounter>
          <div>
            <ul className="horizontal-menu">
              <li>
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            <Switch>
              <Route path="/" exact>
                <ReportComponent />
              </Route>
              <Route path="/insert">
                <FormComponent onAddItem={onAddnewItem} />
                <Transactions items={items} />
              </Route>
            </Switch>
          </div>
          <></>
        </Rounter>
        {/* <p>{result}</p>
        <button onClick={() => dispath({ type: "SHOW" })}>แสดง</button>
        <button onClick={() => dispath({ type: "HIDE" })}>ซ่อน</button> */}
      </div>
    </DataContext.Provider>

  );
}

export default App;
