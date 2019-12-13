import React from 'react'
import { Player as VideoPlayer } from 'video-react'

import {
  isObjectEmpty,
  extractFileExtension,
  imageFormatter,
} from '../../shared/utils'
import useApi from '../../shared/useApi'
import TrackDetails from './TrackDetails/TrackDetails'
import NotFound from '../NotFound/NotFound'

import './ViewTrack.scss'
import 'video-react/dist/video-react.css'

const fileExtensionToPlayer = {
  m4a: VideoPlayer,
  m4v: VideoPlayer,
}

const ViewTrack = ({ trackId }) => {
  let [trackData] = useApi(`/search/${trackId}`)

  if (isObjectEmpty(trackData)) return <NotFound />

  if (!trackData) return <div>Loading...</div>

  const Media =
    fileExtensionToPlayer[extractFileExtension(trackData.previewUrl)]

  return (
    <div className="view-track">
      <div>
        {trackData.artistName} - {trackData.trackName}
      </div>
      <div className="media-info">
        <TrackDetails {...trackData} />
        {Media ? (
          <Media
            src={trackData.previewUrl}
            poster={imageFormatter(trackData.artworkUrl100, 500, 900)}
            autoPlay
            height={500}
            width={900}
            fluid={false}
          />
        ) : (
          <span>This item does not have any media to play</span>
        )}
      </div>
    </div>
  )
}

export default ViewTrack
