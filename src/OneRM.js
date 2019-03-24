import React, { useState, useEffect } from "react"
import { Button, Modal, ModalBody, ModalHeader, FormSelect } from "shards-react"
import store from "./store"
import LiftOneRMRow from "./LiftOneRMRow"

export default function OneRM() {
  const { state, setState } = store.useStore()
  const [open, toggle] = useState(true)

  return (
    <div className="w-100">
      <Button
        size="lg"
        theme="danger"
        className="w-100"
        onClick={() => toggle(!open)}>
        1 Rep Max
      </Button>
      <Modal className="" open={open} toggle={() => toggle(!open)}>
        <ModalBody className="p-1">
          <div className="d-flex align-items-center justify-content-between p-3">
            <h5 className="m-0">1 Rep Max (lbs)</h5>
            <h5 className="m-0" onClick={() => toggle(!open)}>
              Close
            </h5>
          </div>
          <table className="table">
            <thead className="thead-dark text-center">
              <tr className="">
                <th className="" scope="col">
                  Lift
                </th>
                <th className="" scope="col">
                  Weight
                </th>
                <th className="" scope="col">
                  Reps
                </th>
                <th className="" scope="col">
                  Rpe
                </th>
                <th className="" scope="col">
                  1eRM
                </th>
              </tr>
            </thead>
            <tbody>
              {state.liftsOneRM.map(
                ({ id, name, reps, rpe, totalWeight, oneRM }) => {
                  return (
                    <tr key={id} className="text-center">
                      <LiftOneRMRow
                        id={id}
                        name={name}
                        reps={reps}
                        rpe={rpe}
                        totalWeight={totalWeight}
                        oneRM={oneRM}
                      />
                    </tr>
                  )
                }
              )}
            </tbody>
          </table>
        </ModalBody>
      </Modal>
    </div>
  )
}
