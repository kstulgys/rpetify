import React, { useEffect, useState } from "react"
import { Button, FormSelect } from "shards-react"

import store from "./store"
import LiftSetRow from "./LiftSetRow"
import PlatesModal from "./PlatesModal"

const allLifts = [
  { name: "Squat", shortMame: "SQ" },
  { name: "DeadLift", shortMame: "DL" },
  { name: "Bench-Press", shortMame: "BP" },
  { name: "Oh-Press", shortMame: "OP" }
]

export default function LiftContext({ lift }) {
  const { state, setState } = store.useStore()

  return (
    <div className="my-3">
      <FormSelect
        size="lg"
        value={lift.shortName}
        className="w-100 mb-3"
        onChange={e => onNameChange(e.target.value)}
      >
        >
        {state.modifiers.map(({ id, shortName, name }) => {
          return (
            <option key={id} value={shortName}>
              {name}
            </option>
          )
        })}
      </FormSelect>
    </div>
  )

  function onNameChange(shortName) {
    const rootShortName = state.modifiers.find(
      lift => lift.shortName === shortName
    ).rootShortName
    if (shortName.includes("myo")) {
      setState(state => {
        state.currentLifts[lift.no].rootShortName = rootShortName
        state.currentLifts[lift.no].shortName = shortName
        state.currentLifts[lift.no].sets = [
          { no: 0, reps: 15, rpe: 8, times: 1 }
        ]
      })
      return
    } else {
      setState(state => {
        state.currentLifts[lift.no].shortName = shortName
        state.currentLifts[lift.no].rootShortName = rootShortName
      })
    }
  }
}
