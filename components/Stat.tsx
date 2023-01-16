type Props = {
  name: string;
  percent: string;
  total: string;
  color: string;
};
const Stat: React.FC<Props> = ({ name, percent, total, color }) => {
  return (
    <div className={`stats shadow text-white ${color} p-3`}>
      <div className="stat">
        <div className="font-semibold">{name}</div>
        <div className="stat-value">{percent} %</div>
        <div className="stat-desc font-semibold">{total}</div>
      </div>
    </div>
  );
};

export default Stat;
