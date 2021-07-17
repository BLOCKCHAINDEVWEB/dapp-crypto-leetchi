export const formatDate = dateString => {
  const options = { day: "numeric", month: "long", year: "numeric"  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export const changeUnity = timeout => {
  let convertTime
  let unity
  if (timeout < 1) {
    convertTime = timeout
    unity = 'Seconde'
  } else if (timeout < 120) {
    convertTime = timeout
    unity = 'Secondes'
  } else if (timeout < 3600) {
    convertTime = Math.round(timeout / 60)
    unity = 'Minute'
  } else if (timeout < 7200) {
    convertTime = Math.round(timeout / 60)
    unity = 'Minutes'
  } else if (timeout < 14400) {
    convertTime = Math.round(timeout / 3600)
    unity = 'Heure'
  } else if (timeout < 86400) {
    convertTime = Math.round(timeout / 3600)
    unity = 'Heures'
  } else if (timeout < 172800) {
    convertTime = Math.round(timeout / 86400)
    unity = 'Jour'
  } else {
    convertTime = Math.round(timeout / 86400)
    unity = 'Jours'
  }
  return { convertTime, unity }
}

export const searchWord = change => {
  let word
  switch (change) {
    case 'Seconde':
      word = 'restante'
      break
    case 'Secondes':
      word = 'restantes'
      break
    case 'Minute':
      word = 'restante'
      break
    case 'Minutes':
      word = 'restantes'
      break
    case 'Heure':
      word = 'restante'
      break
    case 'Heures':
      word = 'restantes'
      break
    case 'Jour':
      word = 'restant'
      break
    case 'Jours':
      word = 'restants'
      break
    default:
      word= ''
      break
  }
  return { word }
}