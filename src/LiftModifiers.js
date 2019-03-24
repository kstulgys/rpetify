import React, { useEffect, useState } from "react"
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  FormSelect,
  Modal,
  ModalHeader,
  ModalBody
} from "shards-react"
import store from "./store"

export default function LiftModifiers() {
  const { state, setState } = store.useStore()
  const [open, toggle] = useState(false)
  const doNotRenderLifts = ["SQ", "BP", "MP", "DL"]

  return (
    <div className="w-100">
      <Button
        size="lg"
        theme="danger"
        className="w-100"
        onClick={() => toggle(!open)}>
        Lift Modifiers
      </Button>
      <Modal className="" open={open} toggle={() => toggle(!open)}>
        <ModalBody className="p-3">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="m-0">Lift Modifiers</h5>
            <h5 className="m-0" onClick={() => toggle(!open)}>
              Close
            </h5>
          </div>

          <hr />
          <div
            style={{
              overflowY: "auto",
              height: "75vh"
            }}>
            {state.modifiers.map(
              ({ id, rootShortName, shortName, modifier }) => {
                if (!doNotRenderLifts.includes(shortName)) {
                  return (
                    <LiftModifierRow
                      key={id}
                      id={id}
                      rootShortName={rootShortName}
                      shortName={shortName}
                      modifier={modifier}
                    />
                  )
                }
                return null
              }
            )}
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

function LiftModifierRow({ id, rootShortName, shortName, modifier }) {
  const { state, setState } = store.useStore()

  const rootOneRMObj = state.liftsOneRM.find(
    lift => lift.shortName === rootShortName
  )

  const onModifierChange = val => {
    setState(state => {
      state.modifiers[id].modifier = val
      state.modifiers[id].shortName = shortName
    })
  }

  return (
    <div className="d-flex justify-content-between align-items-center my-3">
      <h6 className="m-0 p-0" style={{ minWidth: 85 }}>
        {shortName}
      </h6>
      <div className="d-flex align-items-center">
        <FormSelect
          // className="w-100"
          style={{ width: 100 }}
          onChange={e => onModifierChange(Number(e.target.value))}
          value={modifier}>
          {oneRMPercentage().map(percent => {
            return (
              <option key={percent} value={percent}>
                {Number((percent * 100).toFixed(1))} %
              </option>
            )
          })}
        </FormSelect>
        <h6 className="p-0 m-0 mx-2">of</h6>
        <h6 className="p-0 m-0"> {rootOneRMObj.name}</h6>
        {/* <FormSelect
          value={rootOneRM}
          // onChange={e => onLiftRefChange(e.target.value)}
          className="text-center"
        >
          {rootOneRMs().map(({ name, ref }) => {
            return (
              <option key={ref} value={ref}>
                {name}
              </option>
            )
          })}
        </FormSelect> */}
        <h6 className="p-0 m-0 ml-2">1RM</h6>
      </div>
    </div>
  )
}

// function rootOneRMs() {
//   return [
//     { name: "Squat", ref: "oneRMSquat" },
//     { name: "Deadlift", ref: "oneRMDeadlift" },
//     { name: "Bench-Pres", ref: "oneRMBenchPress" },
//     { name: "Overhead-Press", ref: "oneRMOverheadPress" }
//   ]
// }

function oneRMPercentage() {
  return [
    0.325,
    0.35,
    0.375,
    0.4,
    0.425,
    0.45,
    0.475,
    0.5,
    0.525,
    0.55,
    0.575,
    0.6,
    0.625,
    0.65,
    0.675,
    0.7,
    0.725,
    0.75,
    0.775,
    0.8,
    0.825,
    0.85,
    0.875,
    0.9,
    0.925,
    0.95,
    0.975,
    1,
    1.25,
    1.5,
    1.75,
    2,
    2.25,
    2.5,
    2.75,
    3
  ]
}
