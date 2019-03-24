import React, { useMemo, useContext, createContext, useState } from "react"
import { useImmer } from "use-immer"

const initialState = {
  liftsOneRM: [
    {
      id: 0,
      name: "Squat",
      shortName: "SQ",
      reps: 5,
      rpe: 8,
      totalWeight: 0,
      oneRM: 0
    },
    {
      id: 1,
      name: "Deadlift",
      shortName: "DL",
      reps: 5,
      rpe: 8,
      totalWeight: 0,
      oneRM: 0
    },
    {
      id: 2,
      name: "B-Press",
      shortName: "BP",
      reps: 5,
      rpe: 8,
      totalWeight: 0,
      oneRM: 0
    },
    {
      id: 3,
      name: "M-Press",
      shortName: "MP",
      reps: 5,
      rpe: 8,
      totalWeight: 0,
      oneRM: 0
    }
  ],

  modifiers: [
    { id: 0, rootShortName: "SQ", shortName: "SQ", modifier: 1 },
    { id: 1, rootShortName: "MP", shortName: "MP", modifier: 1 },
    { id: 2, rootShortName: "DL", shortName: "DL", modifier: 1 },
    { id: 3, rootShortName: "BP", shortName: "BP", modifier: 1 },
    { id: 4, rootShortName: "BP", shortName: "BP1s", modifier: 0.9 },
    {
      id: 5,
      rootShortName: "BP",
      shortName: "BPcg",
      modifier: 0.9
    },
    {
      id: 6,
      rootShortName: "BP",
      shortName: "BPcgInc",
      modifier: 0.8
    },
    {
      id: 7,
      rootShortName: "BP",
      shortName: "BPInc2s",
      modifier: 0.8
    },
    { id: 8, rootShortName: "DL", shortName: "RDL", modifier: 0.8 },
    { id: 9, rootShortName: "DL", shortName: "PR", modifier: 0.7 },
    { id: 10, rootShortName: "DL", shortName: "SLDL", modifier: 0.8 },
    { id: 11, rootShortName: "DL", shortName: "PR-myo", modifier: 0.45 },
    {
      id: 12,
      rootShortName: "MP",
      shortName: "MP-myo",
      modifier: 0.45
    },
    {
      id: 13,
      rootShortName: "BP",
      shortName: "DBfb-myo",
      modifier: 0.325
    },
    {
      id: 14,
      rootShortName: "BP",
      shortName: "BPcg-myo",
      modifier: 0.4
    },
    {
      id: 15,
      rootShortName: "SQ",
      shortName: "LP-myo",
      modifier: 1
    }
  ],

  currentLifts: [
    {
      shortName: "SQ",
      rootShortName: "SQ",

      no: 0,
      sets: [
        { no: 0, reps: 6, rpe: 8, times: 2 },
        { no: 1, reps: 6, rpe: 7, times: 1 },
        { no: 2, reps: 6, rpe: 6, times: 1 }
      ]
    },
    {
      shortName: "MP",
      rootShortName: "MP",
      no: 1,
      sets: [
        { no: 0, reps: 6, rpe: 8, times: 2 },
        { no: 1, reps: 6, rpe: 7, times: 1 },
        { no: 2, reps: 6, rpe: 6, times: 1 }
      ]
    },
    {
      shortName: "PR-myo",
      rootShortName: "DL",
      no: 2,
      sets: [{ no: 0, reps: 15, rpe: 8, times: 1 }]
    }
  ]
}

const getLocalStorageState = () =>
  JSON.parse(localStorage.getItem("state")) || initialState

const setStateToLocalStorage = state =>
  localStorage.setItem("state", JSON.stringify(state))

const clearLocalStorage = () => {
  const localStorageState = getLocalStorageState()
  let newState = localStorageState
  Object.keys(initialState).map(key => {
    if (!localStorageState.hasOwnProperty(key)) {
      // console.log(key)
      // console.log(initialState[key])
      newState[key] = initialState[key]
      setStateToLocalStorage(newState)
      // window.localStorage.clear()
    }
    return null
  })
}

function makeStore() {
  clearLocalStorage()
  const Context = createContext()

  const useStore = () => useContext(Context)

  const Provider = ({ children }) => {
    const [state, setState] = useImmer(getLocalStorageState)

    useMemo(() => setStateToLocalStorage(state), [state])
    const contextValue = {
      state,
      setState
    }

    return <Context.Provider value={contextValue}>{children}</Context.Provider>
  }

  return {
    Provider,
    useStore
  }
}

export default makeStore()
