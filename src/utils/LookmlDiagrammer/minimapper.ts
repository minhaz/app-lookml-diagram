// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import {
  TABLE_VERTICAL_PADDING,
  TABLE_WIDTH,
  TABLE_DEGREE_STEP,
  TABLE_PADDING,
  TABLE_ROW_HEIGHT,
  DIAGRAM_FIELD_STROKE_WIDTH,
  MINIMAP_WIDTH,
} from '../constants'
import type { DiagramMetadata } from './types'

/**
 * generates diagrammable minimap metadata for a given, diagrammed explore
 * @param currentDimensions
 */
export function generateMinimapDiagram(currentDimensions: DiagramMetadata) {
  let median: number
  let minDegree: number
  let maxDegree: number

  let maxLength = 0

  if (currentDimensions) {
    // figure out the horizontal breadth of diagram
    const currentDegrees =
      currentDimensions &&
      Object.keys(currentDimensions.yOrderLookup)
        .map((d: string) => {
          return +d
        })
        .sort((a: number, b: number) => a - b)
    minDegree = currentDimensions && Math.min(...currentDegrees)
    maxDegree = currentDimensions && Math.max(...currentDegrees)

    const len = currentDegrees && currentDegrees.length

    const mid = currentDegrees && Math.ceil(len / 2)

    // figure out which degree is the middle
    median =
      len % 2 === 0
        ? (currentDegrees[mid] + currentDegrees[mid - 1]) / 2
        : currentDegrees[mid - 1]

    Object.keys(currentDimensions.yOrderLookup).forEach((d: string) => {
      const degreeTablesLength = currentDimensions.yOrderLookup[d]
        .map((tableName: string) => {
          const undefModel =
            typeof currentDimensions.tableData[tableName] === 'undefined'
          return undefModel
            ? 0
            : currentDimensions.tableData[tableName].length +
                TABLE_VERTICAL_PADDING
        })
        .reduce((a: number, b: number) => a + b, 0)
      if (degreeTablesLength > maxLength) {
        maxLength = degreeTablesLength
      }
    })
  }
  const verticalCheck =
    150 / (maxLength * (TABLE_ROW_HEIGHT + DIAGRAM_FIELD_STROKE_WIDTH))
  const horizontalCheck =
    MINIMAP_WIDTH /
    ((1 + Math.max(Math.abs(minDegree), Math.abs(maxDegree))) *
      (TABLE_PADDING + TABLE_WIDTH))
  const minimapScale = Math.min(verticalCheck, horizontalCheck)

  // shift to put the median degree in the middle
  const medianCorrection =
    median > 0 ? -1 * median * TABLE_PADDING : Math.abs(median) * TABLE_PADDING

  const minimapX =
    MINIMAP_WIDTH / 2 -
    (TABLE_WIDTH / 2) * minimapScale +
    medianCorrection * minimapScale
  const minimapY =
    (Math.max(Math.abs(minDegree), Math.abs(maxDegree)) + 1) *
    (TABLE_DEGREE_STEP * -1)

  // show minimap by default if degree > 2 or more than 40 rows
  const defaultMinimap = !!(
    Math.max(Math.abs(minDegree), Math.abs(maxDegree)) > 2 || maxLength > 40
  )

  return {
    scale: minimapScale,
    x: minimapX,
    y: minimapY,
    default: defaultMinimap,
  }
}
