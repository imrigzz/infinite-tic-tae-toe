function MyButtons({ onReset, onHome }) {
  return (
    <div className="buttons-container">
      <button className="reset-btn" onClick={onHome}>Home</button>
      <button className="reset-btn" onClick={onReset}>Reset Game</button>
    </div>
  );
}

export default MyButtons;