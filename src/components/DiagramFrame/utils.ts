// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import type {
  ILookmlModel,
  ILookmlModelExplore,
} from '@looker/sdk/lib/4.0/models'
import type { SelectOptionProps } from '@looker/components'
import { DIAGRAM_IGNORED_MODELS } from '../../utils/constants'
import type { ExploreDropdown } from './FramePanels'

/**
 * Prepares a list of diagrammable models for the 'Choose a Model' dropdown
 * @param unfilteredModels - the unprepared list of models
 */
export function prepareModelDropdown(unfilteredModels: ILookmlModel[] = []) {
  return unfilteredModels
    .filter((d: ILookmlModel) => {
      return d.explores.length >= 1 && !DIAGRAM_IGNORED_MODELS.includes(d.name)
    })
    .map((d: ILookmlModel) => {
      return {
        value: d.name,
        label: d.label,
      }
    })
    .sort((a: SelectOptionProps, b: SelectOptionProps) =>
      a.label < b.label ? -1 : 1
    )
}

/**
 * Prepares a list of diagrammable explores for the 'Select an Explore' list
 * @param unfilteredModels - the unprepared list of models
 */
export function prepareExploreList(currentModel: ILookmlModel) {
  return currentModel?.explores
    .map((d: ILookmlModelExplore) => {
      return {
        value: d.name,
        label: d.label,
      }
    })
    .sort((a: ExploreDropdown, b: ExploreDropdown) =>
      a.label < b.label ? -1 : 1
    )
}
