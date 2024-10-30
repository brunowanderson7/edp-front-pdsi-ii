import setItensReport from "./setItensReport"

const startGenerateReports = async (data: string[]) => {
  try {
    if (await setItensReport(data)) {
      localStorage.setItem('START_REPORT_DATE', new Date().toDateString())
      localStorage.setItem('IDS_REPORT', JSON.stringify(data))

      localStorage.setItem('CURRENT_REPORT', '0')
    } else {
      throw new Error('Erro ao iniciar laudo')
    }
  } catch (error) {
    throw error
  }
}

export default startGenerateReports