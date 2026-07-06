// Hand-rolled comma grouping rather than toLocaleString — ICU thousands-separator
// behavior for 'en-ZA' isn't guaranteed consistent across environments (some render
// a space, not a comma). This keeps output predictable everywhere.
export function formatRand(amount: number): string {
  return `R${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}
