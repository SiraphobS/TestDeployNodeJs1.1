import XLSX from 'xlsx'
import * as FileSaver from 'file-saver'

export const convertJsonToExcel = (data, sheetName, fileName) => {
    const bookType = 'xlsx'
    const wb = XLSX.utils.book_new()
    const workSheet = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(wb, workSheet, sheetName)
    const wbout = XLSX.write(wb, { bookType, bookSST: true, type: 'binary' })
    const s2ab = s => {
      const buf = new ArrayBuffer(s.length)
      const view = new Uint8Array(buf)
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
      return buf
    }

    return FileSaver.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), `${fileName}.xlsx`)
}