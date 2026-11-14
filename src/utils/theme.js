const END = '#0a0c12'

export function bgFor(icon = '01d') {
  const night = icon.endsWith('n')
  const kind = icon.slice(0, 2)
  let top = night ? '#1b2233' : '#1f3a5c'
  if (kind === '01' && !night) top = '#27507d'
  if (kind === '03' || kind === '04') top = night ? '#222833' : '#3a4452'
  if (kind === '09' || kind === '10') top = '#243b55'
  if (kind === '11') top = '#3b2a5c'
  if (kind === '13') top = '#4a5b70'
  if (kind === '50') top = '#3d4650'
  return `radial-gradient(circle at top, ${top}, ${END} 75%)`
}
