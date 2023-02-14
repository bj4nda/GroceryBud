import React, {useState, useEffect} from "react"
import List from "./List"
import Alert from "./Alert"

const getLocalStorage = () => {
  let list = localStorage.getItem("list")
  if (list) {
    return JSON.parse(localStorage.getItem("list"))
  } else {
    return []
  }
}
function App() {
  const [name, setName] = useState("")
  const [list, setList] = useState(getLocalStorage())
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
      setList(
        list.map(item => {
          if (item.id === editId) {
            return {...item, title: name}
          }
          return item
        })
      )
      setName("")
      setEditId(null)
      setIsEditing(false)
      showAlert(true, "success", "value changed")
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
  const clearItems = () => {
    showAlert(true, "danger", "empty list")
    setList([])
  }

  const removeItem = id => {
    showAlert(true, "danger", "item removed")
    setList(list.filter(item => item.id !== id))
  }

  const editItem = id => {
    const specificItem = list.find(item => item.id === id)
    setIsEditing(true)
    setEditId(id)
    setName(specificItem.title)
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="eg. eggs"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button className="submit-btn" type="submit">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearItems}>
            clear items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
