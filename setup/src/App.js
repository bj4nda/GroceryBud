import React, {useState, useEffect} from "react"
import List from "./List"
import Alert from "./Alert"

function App() {
  const [name, setName] = useState("")
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({
    show: true,
    msg: "hello",
    type: "success",
  })

  const handleSubmit = e => {
    e.preventDefault()
    console.log("hello")
    if (!name) {
      //alert
      showAlert(true, "danger", "Please enter value")
    } else if (name && isEditing) {
      //deal with editing
    } else {
      showAlert(true, "success", "Item value added")
      //create new item
      const newItem = {id: new Date().getTime().toString(), title: name}
      setList([...list, newItem])
      setName("")
    }
  }

  const showAlert = (show = "false", msg = "", type = "") => {
    setAlert({show, msg, type})
  }
  const clearItems = () => {}

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="eg. eggs"
            onChange={e => setName(e.target.value)}
          />
          <button className="submit-btn" type="submit">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} />
          <button className="clear-btn">clear items</button>
        </div>
      )}
    </section>
  )
}

export default App
