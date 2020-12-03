export function fmtKibbles(balance) {
  if (balance == null) return null
  return String(balance) + " KIBBLES"
  // return String(Number(balance) / 100000000) + " KIBBLES"
}
