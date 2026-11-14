import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { t } from '../utils/units'

export default function TempChart({ hourly, unit }) {
  const data = hourly.map((h) => ({ ...h, temp: t(h.temp, unit) }))
  return (
    <section className="card md:col-span-3">
      <h2 className="mb-3 text-sm opacity-60">Temperature (next 24 hours)</h2>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="time" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" fontSize={12} unit="°" domain={['dataMin - 2', 'dataMax + 2']} />
            <Tooltip
              contentStyle={{ background: '#141926', border: '1px solid #333', borderRadius: 8 }}
              formatter={(v) => [`${v}°${unit}`, 'Temp']}
            />
            <Line type="monotone" dataKey="temp" stroke="#fb923c" strokeWidth={3} dot={{ r: 4, fill: '#fb923c' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
