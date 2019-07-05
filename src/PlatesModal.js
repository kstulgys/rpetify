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

  // const warmupArray = [
  //   { set: 1, reps: "3 x 5 (bar)", percent: 0 },
  //   { set: 2, reps: "1 x 8 @50", percent: 0.5 },
  //   { set: 3, reps: "1 x 5 @70", percent: 0.7 },
  //   { set: 4, reps: "1 x 3 @80", percent: 0.8 },
  //   { set: 5, reps: "1 x 1 @90", percent: 0.9 }
  // ];

  const warmupArray = [
    { set: 1, reps: "3 x 5 (bar)", percent: 0 },
    { set: 2, reps: "1 x 5 @45%", percent: 0.45 },
    { set: 3, reps: "1 x 3 @65%", percent: 0.65 },
    { set: 4, reps: "1 x 2 @85%", percent: 0.85 }
  ]

  return (
    <>
      <Button
        size="lg"
        theme="warning"
        className="w-100"
        onClick={() => toggle(!open)}
      >
        {modalName}
      </Button>

      <Modal className="" open={open} toggle={() => toggle(!open)}>
        <ModalBody className="p-0 m-0">
          <table className="table">
            <thead className="thead-dark text-center">
              <tr className="">
                <th scope="col">Sets</th>
                <th scope="col">Reps</th>
                <th scope="col">Plates</th>
              </tr>
            </thead>
            {modalName === "Warm-Up Sets" ? (
              <WarmupSetsBody />
            ) : (
              <WorkSetsBody />
            )}
          </table>
        </ModalBody>
      </Modal>
    </>
  )

  function WarmupSetsBody() {
    return (
      <tbody>
        {warmupArray.map(({ set, reps, percent }) => {
          return (
            <tr key={set} className="text-center">
              <td>
                <h6 className="my-2">{set}</h6>
              </td>
              <td className="text-left d-flex">
                <h6 className="my-2">{reps} =></h6>
                <h6 className="ml-auto my-2">
                  {percent ? getWarmupWeight(percent) : 0}
                </h6>
              </td>
              <td className="text-left">
                <h6 className="my-2 font-weight-bold">
                  {percent ? getPlatesOnBar(getWarmupWeight(percent)) : "-"}
                </h6>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }

  function WorkSetsBody() {
    return (
      <tbody>
        {sets.map(({ no, reps, rpe, times }) => {
          return (
            <tr key={no} className="text-center">
              <td>
                <h6 className="my-2">{no + 1}</h6>
              </td>
              <td className="text-left d-flex">
                <h6 className="my-2">
                  {reps} @{rpe} x {times} =>
                </h6>
                <h6 className="ml-auto my-2">{getWorkWeight(rpe, reps)}</h6>
              </td>
              <td className="text-left">
                <h6 className="font-weight-bold my-2">
                  {getPlatesOnBar(getWorkWeight(rpe, reps))}
                </h6>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }
}
