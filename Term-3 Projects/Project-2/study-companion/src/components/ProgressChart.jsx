import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function ProgressChart({ completionPercent, completed, pending, subjectProgress }) {

    // data for the pie chart
    const pieData = [
        { name: 'Completed', value: completed },
        { name: 'Pending', value: pending }
    ]
    const pieColors = ['#4caf50', '#ff9800']

    return (
        <div className="charts-container">
            {/* Completion Pie Chart */}
            <div className="chart-box">
                <h3>Completion ({completionPercent}%)</h3>
                {completed + pending > 0 ? (
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}`}
                            >
                                {pieData.map((entry, i) => (
                                    <Cell key={i} fill={pieColors[i]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="no-data">No tasks yet</p>
                )}
            </div>

            {/* Subject Progress Bar Chart */}
            <div className="chart-box">
                <h3>Subject Progress</h3>
                {subjectProgress.length > 0 ? (
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={subjectProgress}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="completed" fill="#4caf50" name="Completed" />
                            <Bar dataKey="total" fill="#e0e0e0" name="Total" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="no-data">No subjects yet</p>
                )}
            </div>
        </div>
    )
}

export default ProgressChart
