import { useState, useEffect } from "react";
import "./App.css"
const STATUS = (pct) => (pct >= 75 ? "Present" : "Absent");

export default function App() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showLow, setShowLow] = useState(false);
  const [sortAsc, setSortAsc] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json())
      .then((data) =>
        setStudents(
          Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            name: `${data[i % 10].name}`,
            attendance: Math.floor(Math.random() * 51) + 50,
          }))
        )
      );
  }, []);

  let list = students
    .filter((s) => filter === "All" || STATUS(s.attendance) === filter)
    .filter((s) => !showLow || s.attendance < 75);

  if (sortAsc !== null)
    list = [...list].sort((a, b) =>
      sortAsc ? a.attendance - b.attendance : b.attendance - a.attendance
    );

  return (
    <div className="page">
      <h1 className="title">🎓 Student Attendance Viewer</h1>

      <div className="controls">
        {["All", "Present", "Absent"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={styles.btn(filter === f)}>
            {f}
          </button>
        ))}
        <button onClick={() => setShowLow((p) => !p)} style={styles.btn(showLow)}>
          {showLow ? "Show All" : "Show <75%"}
        </button>
        <button
          onClick={() => setSortAsc((p) => (p === null ? true : p ? false : null))}
          style={styles.btn(sortAsc !== null)}
        >
          Sort {sortAsc === null ? "↕" : sortAsc ? "↑" : "↓"}
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            {["#", "Name", "Attendance %", "Status"].map((h) => (
              <th key={h} className="th">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((s) => {
            const low = s.attendance < 75;
            const isSelected = selected?.id === s.id;
            return (
              <tr
                key={s.id}
                onClick={() => setSelected(s)}
                style={{ background: isSelected ? "#dbeafe" : "white", cursor: "pointer" }}
              >
                <td className="td">{s.id}</td>
                <td className="td">{s.name}</td>
                <td className="td" style={{color: low ? "#dc2626" : "#16a34a", fontWeight: 600 }}>{s.attendance}%</td>
                <td className="td"><span style={styles.badge(low)}>{STATUS(s.attendance)}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selected && (
        <div className="card">
          <strong className="name">Selected:</strong> 
          <span className="name">{selected.name}</span> 

          <span className={selected.attendance < 75 ? "low" : "good"}>
            -  {selected.attendance}%
            - </span> 

          <span className={selected.attendance < 75 ? "low" : "good"}>
          {STATUS(selected.attendance)}
          </span>
        </div>
      )}
    </div>
  );
}

const styles = {
  btn: (active) => ({
    padding: "6px 14px",
    borderRadius: 6,
    border: "1px solid #94a3b8",
    cursor: "pointer",
    background: active ? "#1e40af" : "white",
    color: active ? "white" : "#1e293b",
    fontWeight: 500,
  }),

  badge: (low) => ({
    padding: "2px 10px", borderRadius: 12,
    fontSize: 12,
    fontWeight: 600,
    background: low ? "#fee2e2" : "#dcfce7",
    color: low ? "#dc2626" : "#16a34a",
  }),
};
