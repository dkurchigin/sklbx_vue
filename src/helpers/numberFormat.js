export default function numberFormat(value) {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(value)) {
    return '';
  }
  return Intl.NumberFormat().format(value) || '';
}
