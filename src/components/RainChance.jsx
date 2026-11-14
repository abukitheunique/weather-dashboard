export default function RainChance({ daily }) {
  return (
    <section className="card">
      <h2 className="mb-3 text-sm opacity-60">Chances of Rain</h2>
      <div className="space-y-2">
        {daily.map((d, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-8 opacity-70">{d.day}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-orange-400" style={{ width: `${d.pop}%` }} />
            </div>
            <span className="w-8 text-right">{d.pop}%</span>
          </div>
        ))}
      </div>
    </section>
  )
}
