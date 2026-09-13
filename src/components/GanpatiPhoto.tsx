import { photoSrc } from '../data/ganpatis'
import { tx } from '../i18n/ui'
import { locText } from '../state/GuideContext'
import type { Ganpati, Lang } from '../types'

type Variant = 'card' | 'hero' | 'thumb'

type Props = {
  ganpati: Ganpati
  lang: Lang
  variant?: Variant
  credit?: boolean
}

export function GanpatiPhoto({ ganpati, lang, variant = 'card', credit = false }: Props) {
  return (
    <figure className={`bappa bappa--${variant}`}>
      <img
        src={photoSrc(ganpati.photo)}
        alt={locText(ganpati.photoAlt, lang)}
        sizes="(max-width: 760px) 100vw, 760px"
        loading={variant === 'hero' ? 'eager' : 'lazy'}
        decoding="async"
      />
      {credit ? (
        <figcaption>
          {tx(lang, 'photoCredit')}{' '}
          <a href={ganpati.photoCredit.sourceUrl} target="_blank" rel="noreferrer">
            {ganpati.photoCredit.author}
          </a>
          {` · ${ganpati.photoCredit.license}`}
        </figcaption>
      ) : null}
    </figure>
  )
}
