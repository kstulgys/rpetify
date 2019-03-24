import React, { useEffect, useState } from "react"
import { Button } from "shards-react"

import store from "./store"

export default function AddLift() {
  const { state, setState } = store.useStore()

  const onLiftAdd = () => {
    const no = state.currentLifts.length > 0 ? state.currentLifts.length : 0
    setState(state => {
      state.currentLifts.push({
        shortName: "SQ",
        rootShortName: "SQ",
        no: no,
        sets: [
          { no: 0, reps: 6, rpe: 8, times: 1 },
          { no: 1, reps: 6, rpe: 7, times: 1 },
          { no: 2, reps: 6, rpe: 6, times: 1 }
        ]
      })
    })
  }

  return (
    <div>
      <Button
        onClick={onLiftAdd}
        size="lg"
        theme="warning"
        className="w-100 mt-3">
        Add Lift
      </Button>
    </div>
  )
}
