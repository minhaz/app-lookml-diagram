// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

export interface SelectionInfoPacket {
  lookmlElement?: string
  name?: string
  grouped?: string
  link?: string
}

export interface VisibleViewLookup {
  [view_name: string]: boolean
}

export interface LookmlObjectMetadata {
  name: string
  lookmlLink: string
  description?: string
  joinCode?: string
  connectionName?: string
  label?: string
  groupLabel?: string
  projectName?: string
  accessFilters?: any[]
  joinType?: string
  joinRelationship?: string
  joinIconType?: string
  fieldType?: string
  labelShort?: string
  fieldGroupLabel?: string
  viewLabel?: string
  valueFormat?: string
  userAttributeFilterTypes?: string[]
  fieldSql?: string
  primaryKey?: boolean
  fieldCode?: string
  fieldName?: string
  mapLayer?: string
  fieldCategory?: string
  timeframes?: string[]
  sqlTableName?: string
  lookmlObject?: string
}
