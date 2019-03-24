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
  // console.log("getRootOneRM", getRootOneRM())

  const getModifier = () => {
    return state.modifiers.find(lift => lift.shortName === shortName).modifier
  }

  // console.log("getModifier", getModifier())

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
        <ModalBody className="p-3">
          <h5 className="font-weight-bold mb-4">
            {modalName} (work: {getWorkWeight(workRpe, workReps)} lbs)
          </h5>
          {modalName === "Warm-Up Plates" ? (
            <>
              <h5>1) 8 x 5 (bar)</h5>
              <div className="d-flex">
                <h5>2) 1 x 5 @40% => {getWarmupWeight(0.4)} </h5>
                <h5 className="ml-auto">
                  {getPlatesOnBar(getWarmupWeight(0.4))}
                </h5>
              </div>
              <div className="d-flex">
                <h5>3) 1 x 3 @60% => {getWarmupWeight(0.6)} </h5>
                <h5 className="ml-auto">
                  {getPlatesOnBar(getWarmupWeight(0.6))}
                </h5>
              </div>
              <div className="d-flex">
                <h5>4) 1 x 2 @80% => {getWarmupWeight(0.8)}</h5>
                <h5 className="ml-auto">
                  {getPlatesOnBar(getWarmupWeight(0.8))}
                </h5>
              </div>
            </>
          ) : (
            <>
              {sets.map(({ no, reps, rpe, times }) => {
                return (
                  <div key={no} className="d-flex">
                    <h5>
                      {no + 1}) {reps} @ {rpe} x {times} =>{" "}
                      {getWorkWeight(rpe, reps)}
                    </h5>
                    <h5 className="ml-auto">
                      {getPlatesOnBar(getWorkWeight(rpe, reps))}
                    </h5>
                  </div>
                )
              })}
            </>
          )}
        </ModalBody>
      </Modal>
    </>
  )
}
