// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import { TABLE_ROW_HEIGHT } from '../utils/constants'

export const addJoinArrowheads = (join: any, joinName: string) => {
  join
    .append('marker')
    .attr('id', 'arrows-' + joinName)
    .attr('refX', 18)
    .attr('refY', 18)
    .attr('markerWidth', 50)
    .attr('markerHeight', 50)
    .attr('markerUnits', 'userSpaceOnUse')
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M 12 12 24 18 12 24 15 18')
}

export interface JoinPoint {
  x: number
  y: number
  viewName?: string
}

export function getManyPath(
  connectorSize: number,
  rightmost: number,
  joinField: any
): JoinPoint[][] {
  const connectorAlign = rightmost ? connectorSize : connectorSize * -1

  const baseX = joinField.joinX
  const baseY = joinField.joinY + TABLE_ROW_HEIGHT / 2

  const manyTopX = baseX + connectorAlign
  const manyTopY = baseY - 8

  const manyBotX = baseX + connectorAlign
  const manyBotY = baseY + 8

  const topFork = []
  const bottomFork = []

  topFork.push({ x: baseX, y: baseY })
  topFork.push({ x: manyTopX, y: manyTopY })
  bottomFork.push({ x: baseX, y: baseY })
  bottomFork.push({ x: manyBotX, y: manyBotY })

  return [topFork, bottomFork]
}

export function getOnePath(
  connectorSize: number,
  rightmost: number,
  joinField: any
) {
  const path = []
  const connectorAlign = rightmost ? connectorSize : connectorSize * -1

  const baseX = joinField.joinX
  const baseY = joinField.joinY + TABLE_ROW_HEIGHT / 2

  const headX = baseX + connectorAlign
  const headY = baseY

  path.push({ x: baseX, y: baseY })
  path.push({ x: headX, y: headY })

  return [path]
}
