// The approved golf detail (v3 amendment C4) — on hover of the primary Tap In
// CTA, a tiny ball rolls in along the text baseline and settles as a dot
// above the "I". Nav + hero instances ONLY; everywhere else renders plain
// text. "Tap In" has no dotted lowercase i, so the ball becomes one — the
// parent button must carry the `group` class to trigger the roll.
export function TapInLabel() {
  return (
    <span className="whitespace-nowrap">
      Tap{' '}
      <span className="tapin-i">
        I<span aria-hidden="true" className="tapin-ball" />
      </span>
      n
    </span>
  );
}
