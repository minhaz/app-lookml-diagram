// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import * as d3 from 'd3'
import { ZOOM_MAX, ZOOM_MIN } from '../utils/constants'

export function addZoom(
  svg: any,
  zoomFactor: number,
  setZoomFactor: (zoomFactor: number) => void,
  viewPosition: any,
  setViewPosition: (positionPacket: any) => void,
  type: string
) {
  // canvas zoom handler function
  const zoom = d3
    .zoom()
    .scaleExtent([ZOOM_MIN, ZOOM_MAX])
    .on('zoom', function (event) {
      if (type === 'display') {
        d3.selectAll(`.${type}-area`).attr(
          'transform',
          `translate(${event.transform.x}, ${event.transform.y}) scale(${event.transform.k})`
        )
      } else {
        d3.selectAll(`.${type}-area`).attr(
          'transform',
          `translate(${viewPosition.x}, ${viewPosition.y}) scale(${zoomFactor})`
        )
      }
    })
    .on('end', function (event) {
      if (type === 'display') {
        setViewPosition({ x: event.transform.x, y: event.transform.y })
        setZoomFactor(event.transform.k)
      }
    })

  // Init handler to last render's position, or initial position
  svg.call(
    zoom.transform,
    d3.zoomIdentity.translate(viewPosition.x, viewPosition.y).scale(zoomFactor)
  )

  // Invoke handler on svg
  svg.call(zoom)
}
