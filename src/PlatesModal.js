import React, { useState, useEffect } from "react"
import { Button, Modal, ModalBody } from "shards-react"
import { getPlatesOnBar, percentageLookup, getRoundedLbs } from "./utils"
import store from "./store"

export default function PlatesModal({
  modalName,
  sets,
  shortName,
  rootShortName
}) {
  const { state, _ } = store.useStore()
  const [open, toggle] = useState(false)

  const workRpe = sets[0].rpe
  const workReps = sets[0].reps

  const getRootOneRM = () => {
    const rootOneRM = state.liftsOneRM.find(
      lift => lift.shortName === rootShortName
    ).oneRM
    return rootOneRM
  }

  const getModifier = () => {
    return state.modifiers.find(lift => lift.shortName === shortName).modifier
  }

  const getWorkWeight = (rpe, reps) => {
    const rpePercent = percentageLookup[rpe][reps]

    let partialWeight = Math.round(getModifier() * getRootOneRM() * rpePercent)

    if (reps === 15) {
      partialWeight = Math.round(getModifier() * getRootOneRM())
      if (shortName === "DBfb-myo") {
        partialWeight = Math.round(getModifier() * getRootOneRM() + 45)
      }
    }
    return getRoundedLbs(partialWeight)
  }

  const getWarmupWeight = percent => {
    const rpePercent = percentageLookup[workRpe][workReps]

    const partialWeight = Math.round(
      getModifier() * getRootOneRM() * rpePercent * percent
    )
    return getRoundedLbs(partialWeight)
  }
  const warmupArray = [
    { set: 1, reps: "3 x 5 (bar)", percent: 0 },
    { set: 2, reps: "1 x 8 @55", percent: 0.55 },
    { set: 3, reps: "1 x 5 @70", percent: 0.7 },
    { set: 4, reps: "1 x 3 @80", percent: 0.8 },
    { set: 5, reps: "1 x 1 @90", percent: 0.9 }
  ]

  // function WarmupRow(set, text, percent) {
  //   return (
  //     <>
  //       <td>{set}</td>
  //       <td>
  //         {text} {percent}
  //       </td>
  //       <td>{getWarmupWeight(percent)}</td>
  //       <td>{getPlatesOnBar(getWarmupWeight(percent))}</td>
  //     </>
  //   )
  // }

  return (
    <>
      <Button
        size="lg"
        theme="warning"
        className="w-100"
        onClick={() => toggle(!open)}>
        {modalName}
      </Button>

      <Modal className="" open={open} toggle={() => toggle(!open)}>
        <ModalBody className="p-0">
          {modalName === "Warm-Up Sets" ? (
            <table className="table">
              <thead className="thead-dark text-center">
                <tr className="">
                  <th className="" scope="col">
                    Sets
                  </th>
                  <th className="" scope="col">
                    Reps
                  </th>
                  <th className="" scope="col">
                    Plates
                  </th>
                </tr>
              </thead>
              <tbody>
                {warmupArray.map(({ set, reps, percent }) => {
                  return (
                    <tr key={set} className="text-center">
                      <td>{set}</td>
                      <td>
                        {reps} => {getWarmupWeight(percent)}
                      </td>
                      <td className="text-left">
                        {getPlatesOnBar(getWarmupWeight(percent))}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <table className="table">
              <thead className="thead-dark text-center">
                <tr className="">
                  <th className="" scope="col">
                    Sets
                  </th>
                  <th className="" scope="col">
                    Reps
                  </th>
                  <th className="" scope="col">
                    Plates
                  </th>
                </tr>
              </thead>
              <tbody>
                {sets.map(({ no, reps, rpe, times }) => {
                  return (
                    <tr key={no} className="text-center">
                      <td>{no + 1}</td>
                      <td>
                        {reps} @{rpe} x {times} => {getWorkWeight(rpe, reps)}
                      </td>
                      <td className="text-left">
                        {getPlatesOnBar(getWorkWeight(rpe, reps))}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </ModalBody>
      </Modal>
    </>
  )
}
