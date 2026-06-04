// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

// Diagram zoom
export const ZOOM_INIT = 0.5
export const ZOOM_STEP = 0.1
export const ZOOM_MAX = 2
export const ZOOM_MIN = 0.2
export const X_INIT = 600
export const Y_INIT = 100

// Diagram tables, joins
/**
 * the width of each diagram table
 */
export const TABLE_WIDTH = 255
/**
 * the height of each table row
 */
export const TABLE_ROW_HEIGHT = 30
/**
 * the padding between tables
 */
export const TABLE_PADDING = TABLE_WIDTH * 2.2
/**
 * the number of pixels from a diagram table the join path
 * should be offset by to accomodate the join cardinality connector
 */
export const JOIN_CONNECTOR_WIDTH = 40
/**
 * the vertical padding between tables of the same degree
 */
export const TABLE_VERTICAL_PADDING = 5
/**
 * the vertical step each degree will take from the base table
 */
export const TABLE_DEGREE_STEP = -3

export const DIAGRAM_IGNORED_MODELS = ['system__activity']

export const MINIMAP_WIDTH = 200
