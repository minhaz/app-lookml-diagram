// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import React from 'react'
import * as d3 from 'd3'
import { useD3 } from '../../../d3-utils/useD3'
import { addFilter } from '../../../d3-utils/styles'
import { addZoom } from '../../../d3-utils/zoom'
import { createLookmlViewElement } from '../../../d3-utils/tables'
import { createLookmlJoinElement } from '../../../d3-utils/joins'
import type { DiagramJoin } from '../../../utils/LookmlDiagrammer'
import type { DiagramProps } from './types'
import { DiagramSpace } from './components/DiagramSpace'

export const Diagram: React.FC<DiagramProps> = ({
  type,
  dimensions,
  explore,
  reload,
  selectionInfo,
  setSelectionInfo,
  hiddenToggle,
  displayFieldType,
  viewVisible,
  zoomFactor,
  setZoomFactor,
  viewPosition,
  setViewPosition,
}) => {
  const diagramViews = Object.keys(viewVisible).filter((viewName: string) => {
    return viewVisible[viewName]
  })

  const ref = useD3(
    // useD3 callback,
    // This function will be called for each d3 render
    (svg: d3.Selection<SVGElement, any, HTMLElement, any>) => {
      // Clean up the previous d3 render
      d3.selectAll(`.${type}-area > *`).remove()

      // Add clickable background
      d3.selectAll(`g.${type}-area`)
        .append('rect')
        .attr('class', 'clickable-background')
        .attr('width', '10000')
        .attr('height', '10000')
        .attr('x', '-5000')
        .attr('y', '-5000')
        .on('click', () => {
          setSelectionInfo({})
        })
        .attr('fill', type === 'minimap' ? 'transparent' : 'url(#dotsPattern)')

      // Add global svg defs
      addZoom(
        svg,
        zoomFactor,
        setZoomFactor,
        viewPosition,
        setViewPosition,
        type
      )

      addFilter(svg)

      // Create all joins
      dimensions.joinData.forEach((join: DiagramJoin[]) => {
        // but not to any disabled tables
        let allVisible = true
        join.forEach((joinPart: DiagramJoin) => {
          if (!viewVisible[joinPart.viewName]) {
            allVisible = false
          }
        })
        allVisible &&
          createLookmlJoinElement(
            svg,
            join,
            dimensions,
            selectionInfo,
            setSelectionInfo,
            type
          )
      })

      // Create all tables
      diagramViews.forEach((lookmlViewName: string) => {
        const tableData = dimensions.tableData[lookmlViewName]
        tableData &&
          createLookmlViewElement(
            svg,
            tableData,
            selectionInfo,
            setSelectionInfo,
            type
          )
      })

      const tableRowTypes = ['dimension', 'measure', 'view']
      // Highlight anything selected on previous render
      if (selectionInfo.grouped) {
        d3.selectAll(
          '#' + selectionInfo.name.replace('.', '-') + '.table-row-grouped'
        ).classed('table-row-selected', true)
      } else if (tableRowTypes.includes(selectionInfo.lookmlElement)) {
        d3.selectAll(
          '#' +
            selectionInfo.name.replace('.', '-') +
            ':not(.table-row-grouped)'
        ).classed('table-row-selected', true)
      } else if (selectionInfo.lookmlElement === 'join') {
        d3.selectAll('g.join-' + selectionInfo.name)
          .classed('join-path-selected', true)
          .raise()
      }

      // Add minimap viewport indicator
      type === 'minimap' &&
        d3
          .selectAll(`g.${type}-area`)
          .append('rect')
          .attr('fill', '#282828')
          .attr('fill-opacity', '0.1')
          .attr('width', viewPosition.clientWidth)
          .attr('height', viewPosition.clientHeight)
          .attr('x', viewPosition.displayX * -1)
          .attr('y', viewPosition.displayY * -1)
    },
    // useD3 dependencies array,
    // Diagram will be redrawn any time these variables change
    [
      diagramViews.length,
      explore.name,
      reload,
      selectionInfo,
      hiddenToggle,
      displayFieldType,
      zoomFactor,
      viewPosition.displayX,
      viewPosition.displayY,
      viewPosition.clientWidth,
    ]
  )
  return (
    <DiagramSpace
      ref={ref}
      id={`${type}-diagram-svg`}
      type={type}
      height={type.includes('help') ? viewPosition.clientHeight : undefined}
    >
      <g className={`${type}-area`} />
    </DiagramSpace>
  )
}

export default Diagram
