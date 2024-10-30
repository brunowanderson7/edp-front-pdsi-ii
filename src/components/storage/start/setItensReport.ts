const setItensReport = async (data: string[]) => {
  try {
    data.forEach((item) => {
      localStorage.setItem(`ID@${item}`, '[]')
      localStorage.setItem(`CURRENT@${item}`, '0')
    })
  } catch (error) {
    throw error
  }

  return true
}

export default setItensReport