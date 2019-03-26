function getPlatesOnBar(weight) {
  let weightWithoutBar = weight - 45
  let plates = []

  getOneSidePlates(45, weightWithoutBar) //=> `45x3`
  getOneSidePlates(35, weightWithoutBar) //=> `45x3`
  getOneSidePlates(25, weightWithoutBar) //=> `45x3`
  getOneSidePlates(10, weightWithoutBar) //=> `45x3`
  getOneSidePlates(5, weightWithoutBar) //=> `45x3`
  getOneSidePlates(2.5, weightWithoutBar) //=> `45x3`

  return plates.join(" / ")

  function getOneSidePlates(size, _weight) {
    const roundedWeight = Math.floor(_weight / size)
    if (roundedWeight === 1) {
      return
    }
    if (roundedWeight % 2 === 0) {
      let times = roundedWeight / 2
      if (times === 1) {
        plates.push(`${size}`)
      }
      if (times > 1) {
        plates.push(`${size}x${times}`)
      }
      weightWithoutBar = Math.round(_weight - roundedWeight * size)
      return
    }
    if (roundedWeight % 2 !== 0) {
      let times = (roundedWeight - 1) / 2
      if (times === 1) {
        plates.push(`${size}`)
        weightWithoutBar = Math.round(_weight - (roundedWeight - 1) * size)
        return
      }
      if (times > 1) {
        plates.push(`${size}x${times}`)
        weightWithoutBar = Math.round(_weight - (roundedWeight - 1) * size)
        return
      }
      return
    }
    return
  }
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

const percentageLookup = {
  10: [
    null,
    1,
    0.955,
    0.922,
    0.892,
    0.863,
    0.837,
    0.811,
    0.786,
    0.762,
    0.739,
    0.707,
    0.68
  ],
  9.5: [
    null,
    0.978,
    0.939,
    0.907,
    0.878,
    0.85,
    0.824,
    0.799,
    0.774,
    0.751,
    0.723,
    0.694,
    0.667
  ],
  9: [
    null,
    0.955,
    0.922,
    0.892,
    0.863,
    0.837,
    0.811,
    0.786,
    0.762,
    0.739,
    0.707,
    0.68,
    0.653
  ],
  8.5: [
    null,
    0.939,
    0.907,
    0.878,
    0.85,
    0.824,
    0.799,
    0.774,
    0.751,
    0.723,
    0.694,
    0.667,
    0.64
  ],
  8: [
    null,
    0.922,
    0.892,
    0.863,
    0.837,
    0.811,
    0.786,
    0.762,
    0.739,
    0.707,
    0.68,
    0.653,
    0.626
  ],
  7.5: [
    null,
    0.907,
    0.878,
    0.85,
    0.824,
    0.799,
    0.774,
    0.751,
    0.723,
    0.694,
    0.667,
    0.64,
    0.613
  ],
  7: [
    null,
    0.892,
    0.863,
    0.837,
    0.811,
    0.786,
    0.762,
    0.739,
    0.707,
    0.68,
    0.653,
    0.626,
    0.599
  ],
  6.5: [
    null,
    0.878,
    0.85,
    0.824,
    0.799,
    0.774,
    0.751,
    0.723,
    0.694,
    0.667,
    0.64,
    0.613,
    0.586
  ],
  6: [
    null,
    0.863,
    0.837,
    0.811,
    0.786,
    0.762,
    0.739,
    0.707,
    0.68,
    0.653,
    0.626,
    0.599,
    0.599,
    0.572
  ]
}

export { getPlatesOnBar, percentageLookup, getRoundedLbs }
