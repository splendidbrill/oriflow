
function Receipts(){
  const items = [
    "no streaks", "no shame spirals", "no daily affirmations", "no 'guru voice'",
    "no leaderboards", "no productivity-bro overlay", "no 'high-vibes only'",
    "no 30-day transformations", "no notification guilt"
  ];
  const doubled = [...items, ...items];
  return (
    <div className="receipts">
      <div className="receipts-track">
        {doubled.map((s,i)=><span key={i}>{s}</span>)}
      </div>
    </div>
  );
}

export default Receipts;
