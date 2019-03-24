import React, { useState, useEffect } from "react"
import { Button, Modal, ModalHeader, ModalBody } from "shards-react"
import store from "./store"
import { getPlatesOnBar } from "./utils"

export default function LiftModals() {
  const { state, _ } = store.useStore()

  return (
    <div className="row d-flex flex-wrap align-content-start justify-content-center mt-3">
      {lifts().map(({ shortName, fullName, modifier, oneRM }) => {
        return (
          <div className="col-6 p-2" key={shortName}>
            <LiftModalTrigger
              shortName={shortName}
              fullName={fullName}
              modifier={modifier}
              oneRM={oneRM}
            />
          </div>
        )
      })}
    </div>
  )
}

function LiftModalTrigger({ shortName, fullName, modifier, oneRM }) {
  const { state, _ } = store.useStore()
  const [open, toggle] = useState(false)

  const active =
    shortName === "BP1sc" || shortName === "RDL" || shortName === "OP"
  // console.log(active)
  return (
    <div>
      <Button
        className="w-100"
        size="lg"
        theme="warning"
        outline={!active}
        onClick={() => toggle(!open)}>
        {shortName}
      </Button>
      <Modal className="" open={open} toggle={() => toggle(!open)}>
        <ModalHeader style={{ width: "100%" }} className="d-flex">
          <span> {fullName}</span>
          <span className="ml-auto"> X</span>
        </ModalHeader>

        <ModalBody className="p-3">
          <h5 className="font-weight-bold mb-4">Warm-Up</h5>
          <h5>1) 8 x 5 => (bar)</h5>
          <div className="d-flex">
            <h5>2) 1 x 5 @40% => {getWarmupWeight(0.4)} </h5>
            <h5 className="ml-auto">{getPlatesOnBar(getWarmupWeight(0.4))}</h5>
          </div>
          <div className="d-flex">
            <h5>3) 1 x 3 @60% => {getWarmupWeight(0.6)} </h5>
            <h5 className="ml-auto">{getPlatesOnBar(getWarmupWeight(0.6))}</h5>
          </div>
          <div className="d-flex">
            <h5>4) 1 x 2 @80% => {getWarmupWeight(0.8)}</h5>
            <h5 className="ml-auto">{getPlatesOnBar(getWarmupWeight(0.8))}</h5>
          </div>
          <div className="d-flex">
            <h5>5) 1 x 1 @95% => {getWarmupWeight(0.95)} </h5>
            <h5 className="ml-auto">{getPlatesOnBar(getWarmupWeight(0.95))}</h5>
          </div>

          <h5 className="font-weight-bold my-4">Work-Sets</h5>
          <div className="d-flex">
            <h5>6 @ 8 rpe => {weightAtRpe8()} </h5>
            <h5 className="ml-auto">{getPlatesOnBar(weightAtRpe8())}</h5>
          </div>
          <div className="d-flex">
            <h5>6 @ 7 rpe => {weightAtRpe7()} </h5>
            <h5 className="ml-auto">{getPlatesOnBar(weightAtRpe7())}</h5>
          </div>
          <div className="d-flex">
            <h5>6 @ 6 rpe => {weightAtRpe6()} </h5>
            <h5 className="ml-auto">{getPlatesOnBar(weightAtRpe6())}</h5>
          </div>
          <h5 className="font-weight-bold my-4">Myo-reps</h5>
          <div className="d-flex">
            <h5>14-16 @ 8 rpe => {weightAtRpe8Myo()} </h5>
            <h5 className="ml-auto">{getPlatesOnBar(weightAtRpe8Myo())}</h5>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )

  function weightAtRpe6() {
    return getRoundedLbs(Math.round(modifier * state[oneRM] * 0.72))
  }

  function weightAtRpe7() {
    return getRoundedLbs(Math.round(modifier * state[oneRM] * 0.76))
  }

  function weightAtRpe8() {
    return getRoundedLbs(Math.round(modifier * state[oneRM] * 0.79))
  }

  function weightAtRpe8Myo() {
    return getRoundedLbs(Math.round(modifier * state[oneRM] * 0.6))
  }

  function getRoundedLbs(weight) {
    const lastDigit = weight % 5
    if (lastDigit % 5 === 0) {
      return weight
    }
    if (lastDigit === 1 || lastDigit === 6) {
      return weight - 1
    }
    if (lastDigit === 2 || lastDigit === 7) {
      return weight - 2
    }
    if (lastDigit === 3 || lastDigit === 8) {
      return weight + 2
    }
    if (lastDigit === 4 || lastDigit === 9) {
      return weight + 1
    }
  }

  function getWarmupWeight(percent) {
    const partialWeight = Math.round(weightAtRpe8() * percent)
    return getRoundedLbs(partialWeight)
  }
}

function lifts() {
  return [
    { shortName: "SQ", fullName: "Squat", modifier: 1, oneRM: "oneRMSquat" },
    {
      shortName: "LP",
      fullName: "Leg-Press",
      modifier: 2.5,
      oneRM: "oneRMSquat"
    },
    {
      shortName: "BP1sc",
      fullName: "Bench-Press-1sc-pause",
      modifier: 0.8,
      oneRM: "oneRMBenchPress"
    },
    {
      shortName: "BPcgInc",
      fullName: "Bench-Press-close-grip-incline",
      modifier: 0.8,
      oneRM: "oneRMBenchPress"
    },
    {
      shortName: "DL",
      fullName: "Deadlift",
      modifier: 1,
      oneRM: "oneRMDeadlift"
    },
    {
      shortName: "RDL",
      fullName: "Romanian-Deadlift",
      modifier: 0.8,
      oneRM: "oneRMDeadlift"
    },
    {
      shortName: "PR",
      fullName: "Pandley-Rows",
      modifier: 0.8,
      oneRM: "oneRMDeadlift"
    },
    {
      shortName: "OP",
      fullName: "Overhead-Press",
      modifier: 1,
      oneRM: "oneRMOverheadPress"
    }
  ]
}
