import { DateTime } from 'luxon'

const date = (str) => {
    const jsDate = new Date(str)
    if (jsDate == 'Invalid Date') return '--'
    return DateTime.fromJSDate(jsDate).toLocaleString(DateTime.DATE_MED)
}


export const yyyy_MM_dd = (str) => {
    const jsDate = new Date(str)
    if (jsDate == 'Invalid Date') return '--'
    return DateTime.fromJSDate(jsDate).toFormat('yyyy-MM-dd')
}

export default date