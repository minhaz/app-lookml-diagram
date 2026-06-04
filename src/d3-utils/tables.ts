// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import { theme } from '@looker/components'
import * as d3 from 'd3'
import {
  TABLE_WIDTH,
  TABLE_ROW_HEIGHT,
  DIAGRAM_FIELD_STROKE_WIDTH,
  DIAGRAM_ICON_SCALE,
  CAP_RADIUS,
} from '../utils/constants'
import type { SelectionInfoPacket } from '../components/interfaces'
import type { DiagramField } from '../utils/LookmlDiagrammer/'
import { getLabel } from './styles'
import {
  isTableRowDimension,
  isTableRowMeasure,
  isTableRowBaseView,
  isTableRowView,
  isRounded,
  getDatatypePath,
  getPkPath,
} from './table-helpers'

export function createLookmlViewElement(
  svg: d3.Selection<SVGElement, any, HTMLElement, any>,
  tableData: DiagramField[],
  _selectionInfo: SelectionInfoPacket,
  setSelectionInfo: (packet: SelectionInfoPacket) => void,
  type: string
) {
  const header = tableData[0]

  const table = svg
    .select(`.${type}-area`)
    .append('g')
    .attr('class', 'table-' + header.view)

  type !== 'minimap' &&
    table
      .append('rect')
      .attr('class', 'table-background table-background-' + header.view)
      .attr('x', header.diagramX)
      .attr('y', header.diagramY)
      .attr('rx', CAP_RADIUS)
      .attr('ry', CAP_RADIUS)
      .attr('width', TABLE_WIDTH)
      .attr(
        'height',
        tableData.length *
          (TABLE_ROW_HEIGHT + (DIAGRAM_FIELD_STROKE_WIDTH - 1)) -
          CAP_RADIUS
      )
      .style('filter', 'url(#drop-shadow)')
      .style('opacity', 0.1)

  type === 'minimap' &&
    table
      .append('rect')
      .attr('x', header.diagramX)
      .attr('y', header.diagramY)
      .attr('rx', CAP_RADIUS)
      .attr('ry', CAP_RADIUS)
      .attr('width', TABLE_WIDTH)
      .attr(
        'height',
        tableData.length *
          (TABLE_ROW_HEIGHT + (DIAGRAM_FIELD_STROKE_WIDTH - 1)) -
          CAP_RADIUS
      )
      .style('stroke', theme.colors.text)
      .style('stroke-width', '10px')
      .style('fill', 'transparent')

  const tableRow = table
    .selectAll('.table-row-' + header.view)
    .data(tableData)
    .enter()
    .append('g')
    .attr('class', 'table-row-' + header.view)
    .attr('width', TABLE_WIDTH)
    .attr(
      'height',
      TABLE_ROW_HEIGHT + (DIAGRAM_FIELD_STROKE_WIDTH - 1) - CAP_RADIUS
    )
    .classed('table-row', true)
    .classed('minimap-table-row', type === 'minimap')
    .classed('help-table-row', !!(type === 'help-view' || type === 'help-join'))
    .classed('table-row-dimension', (d: DiagramField) => isTableRowDimension(d))
    .classed('table-row-measure', (d: DiagramField) => isTableRowMeasure(d))
    .classed('table-row-grouped', (d: DiagramField) => !!d.dimension_group)
    .classed('table-row-view', (d: DiagramField) => isTableRowView(d))
    .classed('table-row-base-view', (d: DiagramField) => isTableRowBaseView(d))
    .attr('id', (d: DiagramField, _i: number) => {
      return `${d.name && d.name.replace('.', '-')}`
    })
    .attr('transform', (_d: DiagramField, i: number) => {
      return `translate(${header.diagramX}, ${
        header.diagramY +
        i * (TABLE_ROW_HEIGHT + (DIAGRAM_FIELD_STROKE_WIDTH - 1))
      })`
    })

  // Create table elements, except first and last
  tableRow
    .append('rect')
    .attr('rx', (_d: DiagramField, i: number) => {
      return isRounded(i, tableData.length) ? CAP_RADIUS : 0
    })
    .attr('ry', (_d: DiagramField, i: number) => {
      return isRounded(i, tableData.length) ? CAP_RADIUS : 0
    })
    .attr('width', TABLE_WIDTH)
    .attr('height', (_d: DiagramField, i: number) => {
      return isRounded(i, tableData.length) && tableData.length > 1
        ? 0
        : TABLE_ROW_HEIGHT + (DIAGRAM_FIELD_STROKE_WIDTH - 1) - CAP_RADIUS
    })

  const tableTopCap = () =>
    tableRow
      .append('path')
      .attr('d', (_dd: DiagramField, i: number) =>
        i === 0
          ? `M0,${TABLE_ROW_HEIGHT} v-${
              TABLE_ROW_HEIGHT - CAP_RADIUS
            } q0,-${CAP_RADIUS} ${CAP_RADIUS},-${CAP_RADIUS} h${
              TABLE_WIDTH - CAP_RADIUS * 2
            } q${CAP_RADIUS},0 ${CAP_RADIUS},${CAP_RADIUS} v${
              TABLE_ROW_HEIGHT - CAP_RADIUS
            } z`
          : `M0,0`
      )
      .classed('table-row', true)
      .classed('table-row-view', (d: DiagramField) => isTableRowView(d))
      .classed('table-row-base-view', (d: DiagramField) =>
        isTableRowBaseView(d)
      )

  const tableBottomCap = () =>
    tableRow
      .append('path')
      .attr('d', (_dd: DiagramField, i: number) =>
        i === tableData.length - 1
          ? `M0,0 h${TABLE_WIDTH} v${
              TABLE_ROW_HEIGHT - CAP_RADIUS
            } q0,${CAP_RADIUS} -${CAP_RADIUS},${CAP_RADIUS} h-${
              TABLE_WIDTH - CAP_RADIUS * 2
            } q-${CAP_RADIUS},0 -${CAP_RADIUS},-${CAP_RADIUS} z`
          : `M0,0`
      )
      .classed('table-row', true)
      .classed('table-row-dimension', (d: DiagramField) =>
        isTableRowDimension(d)
      )
      .classed('table-row-measure', (d: DiagramField) => isTableRowMeasure(d))

  tableData.length > 1 && tableTopCap()

  tableData.length > 1 && tableBottomCap()

  // Add diagram details
  if (type !== 'minimap') {
    // Add datatype icon
    tableRow
      .append('path')
      .attr('d', getDatatypePath)
      .attr('class', 'datatype-icon')
      .attr('transform', (_d: DiagramField, _i: number) => {
        return `translate(2,${
          DIAGRAM_FIELD_STROKE_WIDTH / 2 + 2
        })scale(${DIAGRAM_ICON_SCALE})`
      })
    // Add PK icon if needed
    tableRow
      .append('path')
      .attr('d', getPkPath)
      .attr('class', 'pk-icon')
      .attr('transform', (_d: DiagramField, _i: number) => {
        return `translate(${TABLE_WIDTH - DIAGRAM_FIELD_STROKE_WIDTH * 3}, ${
          DIAGRAM_FIELD_STROKE_WIDTH / 2 + 2
        })scale(${DIAGRAM_ICON_SCALE})`
      })
    // Label table elements
    tableRow
      .append('text')
      .attr('transform', (_d: DiagramField, i: number) => {
        return `translate(${i === 0 ? 5 : 25}, ${
          DIAGRAM_FIELD_STROKE_WIDTH / 2
        })`
      })
      .attr('dy', '0.9em')
      .text((d: DiagramField) => getLabel(d))
    // Add dividers
    tableRow
      .append('line')
      .attr('x1', 0 - DIAGRAM_FIELD_STROKE_WIDTH / 2)
      .attr('y1', TABLE_ROW_HEIGHT + 3)
      .attr('x2', TABLE_WIDTH + DIAGRAM_FIELD_STROKE_WIDTH / 2)
      .attr('y2', TABLE_ROW_HEIGHT + 3)
      .attr('class', (_d: DiagramField, i: number) => {
        return i === 0 || i === tableData.length - 1 || 'row-divider'
      })
  }
  // Add click event
  type === 'display' &&
    tableRow.on('click', (d: DiagramField) => {
      // Chrome prefers 'toElement', Firefox implements as 'target'
      const target = (d as any).toElement || (d as any).target
      const arr: any = d3.select(target).datum()
      setSelectionInfo({
        lookmlElement: arr?.category,
        name: arr.name,
        grouped: arr.dimension_group,
        link: arr.lookml_link,
      })
    })
}
