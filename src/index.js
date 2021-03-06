import "bootstrap/dist/css/bootstrap.min.css"
import "shards-ui/dist/css/shards.min.css"
import "./styles.css"
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Button, Modal, ModalBody } from "shards-react"
import OneRMModal from "./OneRMModal"
import LiftContext from "./LiftContext"
import AddLift from "./AddLift"
import store from "./store"
import image from "./programImage.jpg"

function App() {
  const { state, setState } = store.useStore()
  const [taps, incTap] = useState(1)

  // console.log(state.modifiers)

  const handleTapped = () => {
    incTap(taps + 1)
  }

  const showProgram = () => {
    if (taps % 8 === 0) {
      return true
    }
    return false
  }
  return (
    <div
      className=" m-0 p-0 row d-flex justify-content-center w-100"
      style={{ height: "100%", overflowX: "hidden" }}
    >
      <div className="col-12 col-sm-6">
        {state.currentLifts.map((lift, i) => {
          return <LiftContext lift={lift} key={i} />
        })}
        <div className="py-4 bg-dark" onClick={handleTapped} />
        {showProgram() && <ProgramModal />}
        <AddLift />
        <div className="my-3">
          <OneRMModal />
        </div>

        <div className="mt-3 w-100 mb-2">
          <Button
            size="lg"
            outline
            theme="warning"
            className="w-100"
            onClick={() => {
              const r = window.confirm(
                "Do you really want to reset the application? All saved data (1eRM etc.) will be lost!"
              )
              if (r === true) {
                localStorage.clear()
                window.location.reload()
              }
            }}
          >
            Application Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

function ProgramModal() {
  const [open, toggle] = useState(false)

  return (
    <div className="w-100">
      <Button
        size="lg"
        theme="info"
        className="w-100"
        onClick={() => toggle(!open)}
      >
        Program
      </Button>
      <Modal className="" open={open} toggle={() => toggle(!open)}>
        <ModalBody className="p-0">
          <img src={image} style={{ width: "100%" }} alt="img" />
        </ModalBody>
      </Modal>
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(
  <store.Provider>
    <App />
  </store.Provider>,
  rootElement
)
