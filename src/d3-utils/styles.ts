// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import { MAX_TEXT_LENGTH, DIAGRAM_SHADOW_ALPHA } from '../utils/constants'

export function truncateLabel(text: string) {
  if (!text) {
    text = ''
  }
  if (text.length > MAX_TEXT_LENGTH) {
    return text.substring(0, MAX_TEXT_LENGTH) + '...'
  }
  return text
}

export function getLabel(field: any) {
  if (field.category === 'view') {
    return truncateLabel(field.view)
  } else {
    return truncateLabel(field.name.split('.')[1])
  }
}

export function addFilter(svg: any) {
  const defs = svg.append('defs')
  const filter = defs
    .append('filter')
    .attr('id', 'drop-shadow')
    .attr('width', '150%')
    .attr('y', '-40%')
    .attr('height', '200%')
  // SourceAlpha refers to opacity of graphic that this filter will be applied to
  // convolve that with a Gaussian with standard deviation 3 and store result
  // in blur
  filter
    .append('feGaussianBlur')
    .attr('in', 'SourceAlpha')
    .attr('stdDeviation', DIAGRAM_SHADOW_ALPHA)
    .attr('result', 'blur')
  // translate output of Gaussian blur to the right and downwards with 2px
  // store result in offsetBlur
  filter.append('feOffset').attr('in', 'blur').attr('result', 'offsetBlur')
  // overlay original SourceGraphic over translated blurred opacity by using
  // feMerge filter. Order of specifying inputs is important!
  const feMerge = filter.append('feMerge')
  feMerge.append('feMergeNode').attr('in', 'offsetBlur')
  feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

  const pattern = svg
    .append('defs')
    .append('pattern')
    .attr('id', 'dotsPattern')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', 30)
    .attr('height', 30)
  pattern
    .append('circle')
    .attr('cx', 15)
    .attr('cy', 15)
    .attr('r', 2)
    .style('fill', '#e7eaec')
  pattern
    .append('circle')
    .attr('cx', 35)
    .attr('cy', 35)
    .attr('r', 2)
    .style('fill', '#e7eaec')
}

export function getTranslation(transform: string) {
  if (!transform) {
    return
  }
  // Create a dummy g for calculation purposes only. This will never
  // be appended to the DOM and will be discarded once this function
  // returns.
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')

  // Set the transform attribute to the provided string value.
  g.setAttributeNS(null, 'transform', transform)

  // consolidate the SVGTransformList containing all transformations
  // to a single SVGTransform of type SVG_TRANSFORM_MATRIX and get
  // its SVGMatrix.
  const matrix = g.transform.baseVal.consolidate().matrix

  // As per definition values e and f are the ones for the translation.
  return [matrix.e, matrix.f]
}
