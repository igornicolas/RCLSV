import {parseISO, format} from 'date-fns';
export const FormatDate = (dataEmISO) => {
  let dataTeste = parseISO(dataEmISO);
  dataTeste = new Date(dataTeste);
  const date = ('0' + dataTeste.getDate()).slice(-2);
  let month = ('0' + dataTeste.getMonth()).slice(-2);
  month++;
  if (month < 10) {
    month = '0' + month;
  }
  dataTeste = date + '/' + month + '/' + dataTeste.getFullYear();

  return dataTeste;
};
export default FormatDate;
