import "bootstrap/dist/css/bootstrap.min.css"
import "shards-ui/dist/css/shards.min.css"
import "./styles.css"
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Button } from "shards-react"
import OneRMModal from "./OneRMModal"
import LiftContext from "./LiftContext"
import AddLift from "./AddLift"
import store from "./store"

function App() {
  const { state, setState } = store.useStore()
  // console.log(state.modifiers)
  return (
    <div
      className=" m-0 p-0 row d-flex justify-content-center w-100"
      style={{ height: "100%", overflowX: "hidden" }}>
      <div className="col-12 col-sm-6">
        {state.currentLifts.map((lift, i) => {
          return <LiftContext lift={lift} key={i} />
        })}
        <br />
        <br />
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
            }}>
            Application Reset
          </Button>
        </div>
      </div>
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
