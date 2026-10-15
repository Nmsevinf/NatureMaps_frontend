import { useState } from 'react'
import { Icon } from '../components/Icon'
import { ScreenHeader } from '../components/ScreenHeader'
import { useApp } from '../context/useApp'
import { offlineZones } from '../data/mock'

/** 1.6.C — Modo offline: zonas descargables (RNF4). La descarga real llegará con el service worker. */
export function Offline() {
  const { t } = useApp()
  const [zones, setZones] = useState(offlineZones)
  const downloaded = zones.filter((z) => z.downloaded)
  const mb = downloaded.reduce((sum, z) => sum + z.sizeMb, 0)

  const download = (id: string) => setZones((zs) => zs.map((z) => (z.id === id ? { ...z, downloaded: true } : z)))

  return (
    <div className="screen">
      <ScreenHeader back title={t('settings.offline')} subtitle={t('offline.subtitle')} />
      <div className="banner-solid">
        <Icon name="cloud" size={26} />
        <span>{t('offline.summary', { mb, n: downloaded.length, total: zones.length })}</span>
      </div>
      <div className="list">
        {zones.map((z) => (
          <div key={z.id} className="row-card">
            <span className="row-card__text">
              <span className="row-card__title">{z.name}</span>
              <span className="row-card__sub">
                {z.sizeMb} MB · {z.downloaded ? t('offline.downloaded') : t('offline.notDownloaded')}
              </span>
            </span>
            {z.downloaded ? (
              <span className="check-circle">
                <Icon name="check" size={14} strokeWidth={2.6} />
              </span>
            ) : (
              <button className="btn btn--small" onClick={() => download(z.id)}>
                {t('offline.download')}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
