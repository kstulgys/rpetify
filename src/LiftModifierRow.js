import React, { useEffect, useState } from "react"
import { FormSelect } from "shards-react"
import store from "./store"

export default function LiftModifierRow({
  id,
  rootShortName,
  shortName,
  modifier
}) {
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
    <>
      <td className="pt-3">{shortName}</td>

      <td className="">
        <FormSelect
          className=""
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
      </td>

      <td className="pt-3">{rootOneRMObj.name}</td>
    </>
  )
}

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
