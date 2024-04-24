import { Dot } from './styles';

export function Pulse() {
  return (
    <span>
      <Dot speedMultiplier={1} i={1} />
      <Dot speedMultiplier={1} i={2} />
      <Dot speedMultiplier={1} i={3} />
    </span>
  );
}

export default Pulse;
