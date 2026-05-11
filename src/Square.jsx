function Square({ value, onSquareClick }) {
  const className = `square ${value ? value.toLowerCase() : ''}`;
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;