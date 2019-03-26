import React, { useState, useEffect } from "react"
import { FormSelect } from "shards-react"
import { getPlatesOnBar, percentageLookup, getRoundedLbs } from "./utils"
import store from "./store"

export default function LiftOneRMRow({
  id,
  name,
  reps,
  rpe,
  totalWeight,
  oneRM
}) {
  const { state, setState } = store.useStore()
  useEffect(
    () => {
      const percent = percentageLookup[rpe][reps]
      const newOneRM = Math.round((totalWeight * 100) / (percent * 100))

      setState(state => {
        state.liftsOneRM[id].oneRM = newOneRM
      })
    },
    [id, name, reps, rpe, totalWeight]
  )

  const handleRepsChange = reps => {
    setState(state => {
      state.liftsOneRM[id].reps = reps
    })
  }

  const handleRpeChange = rpe => {
    setState(state => {
      state.liftsOneRM[id].rpe = rpe
    })
  }

  const handleWeightChange = value => {
    setState(state => {
      state.liftsOneRM[id].totalWeight = Number(value)
    })
  }

  return (
    <>
      <td className="pt-3 px-0 pl-3 text-left" style={{ width: 80 }}>
        {name}
      </td>
      <td className="px-0">
        <FormSelect
          // className="mx-1"
          style={{ width: 65 }}
          value={totalWeight}
          onChange={e => handleWeightChange(Number(e.target.value))}>
          {getPossibleValues().map(val => {
            return (
              <option key={val} value={val}>
                {val}
              </option>
            )
          })}
        </FormSelect>
      </td>
      <td className="px-0">
        <FormSelect
          style={{ width: 60 }}
          className="mx-1"
          value={reps}
          onChange={e => handleRepsChange(Number(e.target.value))}>
          {repsOptions().map(rep => {
            return (
              <option key={rep} value={rep}>
                {rep}
              </option>
            )
          })}
        </FormSelect>
      </td>
      <td className="px-0">
        <FormSelect
          // className="mx-1"
          style={{ width: 60 }}
          value={rpe}
          onChange={e => handleRpeChange(Number(e.target.value))}>
          {rpesOptions().map(rpe => {
            return (
              <option key={rpe} value={rpe}>
                {rpe}
              </option>
            )
          })}
        </FormSelect>
      </td>

      <td className="pt-3 px-0" style={{ width: 60 }}>
        {oneRM}
      </td>
    </>
  )
}
function repsOptions() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}

function rpesOptions() {
  return [6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]
}

function getPossibleValues() {
  return Array(1000)
    .fill(null)
    .map((_, i) => {
      if (i >= 100 && i % 5 === 0) {
        return i
      }
      return null
    })
    .filter(item => item)
}

// function setNewRM(val) {
//   setState(state => {
//     state[liftVal] = Number(val)
//   })
// }

// function setRange(val) {
//   setState(state => {
//     state[rangeVal] = Number(val)
//     state[liftVal] = state[rangeVal]
//   })
// }

// function options() {
//   return Array(100)
//     .fill(null)
//     .map((_, i) => {
//       if ((i + state[rangeVal]) % 5 === 0) {
//         return i + state[rangeVal]
//       }
//     })
//     .filter(item => item)
// }

// function ranges() {
//   return [
//     { text: "100-200", value: 100 },
//     { text: "200-300", value: 200 },
//     { text: "300-400", value: 300 },
//     { text: "400-500", value: 400 }
//   ]
// }
