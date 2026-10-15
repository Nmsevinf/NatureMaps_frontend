import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { useApp } from '../context/useApp'
import { findPlant } from '../data/mock'

type ScanMode = 'planta' | 'monumento'

interface Candidate {
  id: string
  score: number
}

// Resultado simulado. Aquí irá la llamada al backend → Pl@ntNet (RNF2: API externa, sin modelo propio).
const MOCK_PLANT_RESULT: Candidate[] = [
  { id: 'ficus', score: 0.86 },
  { id: 'laurel', score: 0.08 },
  { id: 'naranjo', score: 0.03 },
]

/** 1.3.A / 1.5.2 — Identificar planta o monumento con la cámara. */
export function Scan() {
  const { t } = useApp()
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [mode, setMode] = useState<ScanMode>('planta')
  const [cameraOn, setCameraOn] = useState(false)
  const [flash, setFlash] = useState(false)
  const [state, setState] = useState<'idle' | 'analyzing' | 'results'>('idle')

  // Vista previa de la cámara trasera (requiere HTTPS o localhost).
  useEffect(() => {
    let stream: MediaStream | undefined
    let cancelled = false
    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
      .then((s) => {
        if (cancelled) return s.getTracks().forEach((tr) => tr.stop())
        stream = s
        if (videoRef.current) videoRef.current.srcObject = s
        setCameraOn(true)
      })
      .catch(() => setCameraOn(false))
    return () => {
      cancelled = true
      stream?.getTracks().forEach((tr) => tr.stop())
    }
  }, [])

  const analyze = () => {
    setFlash(true)
    setTimeout(() => setFlash(false), 400)
    setState('analyzing')
    setTimeout(() => {
      if (mode === 'monumento') navigate('/monumento/serranos?nuevo=1')
      else setState('results')
    }, 900)
  }

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) analyze()
    e.target.value = ''
  }

  const accent = mode === 'planta' ? 'var(--scan-plant)' : 'var(--scan-monument)'

  return (
    <div className="screen scan" style={{ ['--scan-accent' as string]: accent }}>
      <video ref={videoRef} className={`scan__video${cameraOn ? ' on' : ''}`} autoPlay playsInline muted />
      <div className="scan__glow" />
      <div className={`scan__flash${flash ? ' on' : ''}`} />

      <div className="scan__top">
        <button className="icon-btn icon-btn--glass" onClick={() => navigate(-1)} aria-label={t('common.back')}>
          <Icon name="back" size={16} strokeWidth={2.4} />
        </button>
        <div className="segmented segmented--glass">
          <button className={mode === 'planta' ? 'on' : ''} onClick={() => setMode('planta')}>
            🌿 {t('scan.plant')}
          </button>
          <button className={mode === 'monumento' ? 'on' : ''} onClick={() => setMode('monumento')}>
            🏛️ {t('scan.monument')}
          </button>
        </div>
        <span style={{ width: 36 }} />
      </div>

      {state !== 'results' ? (
        <>
          <div className="scan__frame">
            <svg width="230" height="230" viewBox="0 0 260 260" fill="none">
              {['M8 40V16a8 8 0 0 1 8-8h24', 'M252 40V16a8 8 0 0 0-8-8h-24', 'M8 220v24a8 8 0 0 0 8 8h24', 'M252 220v24a8 8 0 0 1-8 8h-24'].map((d) => (
                <path key={d} d={d} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              ))}
            </svg>
          </div>
          <div className="scan__hint">
            <div>{state === 'analyzing' ? t('scan.analyzing') : mode === 'planta' ? t('scan.hintPlant') : t('scan.hintMonument')}</div>
            <small>{mode === 'planta' ? t('scan.subPlant') : t('scan.subMonument')}</small>
          </div>
          <div className="scan__controls">
            <button className="icon-btn icon-btn--glass icon-btn--lg" onClick={() => fileRef.current?.click()} aria-label={t('scan.gallery')}>
              <Icon name="image" size={20} />
            </button>
            <button className="shutter" onClick={analyze} disabled={state === 'analyzing'} aria-label="Capturar" />
            <span style={{ width: 48 }} />
          </div>
          <input ref={fileRef} type="file" accept="image/*" capture="environment" hidden onChange={onFile} />
        </>
      ) : (
        <div className="scan__results">
          <h2>{t('scan.results')}</h2>
          {MOCK_PLANT_RESULT.map((c, i) => {
            const p = findPlant(c.id)!
            return (
              <button key={c.id} className={`result${i === 0 ? ' result--best' : ''}`} onClick={() => navigate(`/planta/${p.id}?nuevo=1`)}>
                <span className="thumb">
                  <Icon name="leaf" />
                </span>
                <span className="row-card__text">
                  <span className="row-card__title">{p.scientificName}</span>
                  <span className="row-card__sub">
                    {Math.round(c.score * 100)}% {t('scan.confidence')}
                  </span>
                  <span className="bar">
                    <span style={{ width: `${c.score * 100}%` }} />
                  </span>
                </span>
              </button>
            )
          })}
          <button className="btn btn--ghost-light btn--block" onClick={() => setState('idle')}>
            {t('common.back')}
          </button>
        </div>
      )}
    </div>
  )
}
