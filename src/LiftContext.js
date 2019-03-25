import React, { useEffect, useState } from "react"
import { Button, FormSelect } from "shards-react"

import store from "./store"
import LiftRow from "./LiftRow"
import PlatesModal from "./PlatesModal"

export default function LiftContext({ lift }) {
  const { state, setState } = store.useStore()

  return (
    <div className="my-3">
      <FormSelect
        size="lg"
        value={lift.shortName}
        className="w-100 mb-3"
        onChange={e => onNameChange(e.target.value)}>
        >
        {state.modifiers.map(({ id, shortName, name }) => {
          return (
            <option key={id} value={shortName}>
              {name}
            </option>
          )
        })}
      </FormSelect>
      <div className="row d-flex justify-content-around">
        <div className="col-2 pr-0">
          <h5 className="text-warning">Reps</h5>
        </div>
        <div className="col-2 pr-0 text-center">
          <h5 className="text-warning">Rpe</h5>
        </div>
        <div className="col-2 text-right">
          <h5 className="text-warning ">X</h5>
        </div>
        <div className="col-1 pr-0 text-center">
          <h5 className="text-warning " />
        </div>
      </div>
      {lift.sets.map(set => {
        return (
          <LiftRow
            key={set.no}
            liftNo={lift.no}
            shortName={lift.shortName}
            set={set}
          />
        )
      })}

      <Button
        size="lg"
        theme="warning"
        outline
        className="w-100 my-2"
        onClick={onSetAdd}>
        Add Work Set
      </Button>

      <div className="d-flex mt-1">
        {!lift.shortName.includes("myo") && (
          <>
            <PlatesModal
              modalName="Warm-Up Plates"
              sets={lift.sets}
              shortName={lift.shortName}
              rootShortName={lift.rootShortName}
            />
            <span className="px-2" />
          </>
        )}
        <PlatesModal
          modalName="Work Plates"
          sets={lift.sets}
          shortName={lift.shortName}
          rootShortName={lift.rootShortName}
        />
      </div>
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

  function onSetAdd() {
    const no =
      state.currentLifts[lift.no].sets.length > 0
        ? state.currentLifts[lift.no].sets.length
        : 0
    setState(state => {
      state.currentLifts[lift.no].sets.push({
        no: no,
        reps: 6,
        rpe: 6,
        times: 1
      })
    })
  }
}
