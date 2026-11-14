export const t = (c, u) => (u === 'F' ? Math.round((c * 9) / 5 + 32) : c)
export const spd = (kmh, u) => (u === 'F' ? `${Math.round(kmh * 0.621)} mph` : `${kmh} km/h`)
export const dist = (km, u) => (u === 'F' ? `${(km * 0.621).toFixed(1)} mi` : `${km} km`)
