import React, { useEffect, useState } from "react"
import { FormSelect } from "shards-react"
import { FaTrashAlt } from "react-icons/fa"
import store from "./store"

export default function LiftRow({ liftNo, shortName, set }) {
  const { state, setState } = store.useStore()

  return (
    <div className="row my-2 d-flex justify-content-between align-items-center m-0">
      <div className="col-3 px-0">
        <FormSelect
          size="lg"
          className="w-100"
          value={set.reps}
          onChange={e => onRepsChange(Number(e.target.value))}
        >
          {reps().map(rep => {
            return (
              <option key={rep} value={rep}>
                {rep}
              </option>
            )
          })}
        </FormSelect>
      </div>
      <div className="col-3 px-0">
        {!shortName.includes("myo") ? (
          <FormSelect
            size="lg"
            className="w-100"
            value={set.rpe}
            onChange={e => onRpeChange(Number(e.target.value))}
          >
            {rpes().map(rpe => {
              return (
                <option key={rpe} value={rpe}>
                  {rpe}
                </option>
              )
            })}
          </FormSelect>
        ) : (
          <div className="w-100" />
        )}
      </div>
      <div className="col-3 px-0">
        {!shortName.includes("myo") ? (
          <FormSelect
            className="w-100"
            value={set.times}
            size="lg"
            onChange={e => onTimesChange(Number(e.target.value))}
          >
            >
            {times().map(time => {
              return (
                <option key={time} value={time}>
                  {time}
                </option>
              )
            })}
          </FormSelect>
        ) : (
          <div className="w-100" />
        )}
      </div>
      <div className="col-1 d-flex justify-content-center">
        <h5
          className={
            set.no === 0 ? "text-danger  p-0 m-0" : "text-warning  p-0 m-0"
          }
        >
          <FaTrashAlt onClick={() => onSetRemove(set.no)} />
        </h5>
      </div>
    </div>
  )
  function onRepsChange(val) {
    setState(state => {
      state.currentLifts[liftNo].sets[set.no].reps = val
    })
  }

  function onRpeChange(val) {
    setState(state => {
      state.currentLifts[liftNo].sets[set.no].rpe = val
    })
  }

  function onTimesChange(val) {
    setState(state => {
      state.currentLifts[liftNo].sets[set.no].times = val
    })
  }

  function onSetRemove(setNumber) {
    if (setNumber === 0) {
      let liftNumber = 0
      const r = window.confirm("Do you really want to remove this Lift?")
      if (r === true) {
        setState(state => {
          state.currentLifts = state.currentLifts.filter(
            lift => lift.no !== liftNo
          )
          state.currentLifts = state.currentLifts.map(lift => {
            const updatedLift = { ...lift, no: liftNumber }
            liftNumber++
            return updatedLift
          })
        })
      }
      return
    }

    if (setNumber !== 0) {
      let setNo = 0
      setState(state => {
        state.currentLifts[liftNo].sets = state.currentLifts[
          liftNo
        ].sets.filter(item => item.no !== setNumber)
        state.currentLifts[liftNo].sets = state.currentLifts[liftNo].sets.map(
          set => {
            const updatedLift = { ...set, no: setNo }
            setNo++
            return updatedLift
          }
        )
      })
      return
    }
  }
}

function reps() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
}
function rpes() {
  return [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]
}

function times() {
  return [1, 2, 3, 4, 5]
}
