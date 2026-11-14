import { Sunrise, Sunset } from 'lucide-react'

export default function SunCard({ current }) {
  return (
    <section className="card">
      <h2 className="mb-3 text-sm opacity-60">Sunrise and Sunset</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Sunrise className="text-orange-300" />
          <div>
            <p className="text-xs opacity-60">Sunrise</p>
            <p className="font-semibold">{current.sunrise}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Sunset className="text-orange-400" />
          <div>
            <p className="text-xs opacity-60">Sunset</p>
            <p className="font-semibold">{current.sunset}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
