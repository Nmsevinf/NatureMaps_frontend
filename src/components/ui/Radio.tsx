export function Radio({ checked }: { checked: boolean }) {
  return <span className={`radio${checked ? ' radio--on' : ''}`} aria-hidden="true" />
}
