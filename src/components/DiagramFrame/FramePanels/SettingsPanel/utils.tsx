// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import React from 'react'
import type {
  ILookmlModel,
  ILookmlModelExplore,
  IGitBranch,
} from '@looker/sdk/lib/4.0/models'
import { GitBranch } from '@looker/icons'
import type { SelectOptionProps } from '@looker/components'
import type {
  SelectionInfoPacket,
  VisibleViewLookup,
} from '../../../interfaces'
import {
  X_INIT,
  Y_INIT,
  ZOOM_INIT,
  OVERRIDE_KEY_SUBTLE,
} from '../../../../utils/constants'
import { internalExploreURL } from '../../../../utils/routes'
import type { ExploreDropdown } from '../types'

export function handleExploreChange(
  history: any,
  currentModel: ILookmlModel,
  currentExplore: ExploreDropdown,
  selectionInfo: SelectionInfoPacket,
  setSelectionInfo: (info: SelectionInfoPacket) => void,
  setViewVisible: (visible: VisibleViewLookup) => void,
  setZoomFactor: (zoom: number) => void,
  setViewPosition: (info: any) => void,
  setMinimapUntoggled: (toggle: boolean) => void,
  setMinimapEnabled: (toggle: boolean) => void
) {
  selectionInfo.lookmlElement === 'explore' || setSelectionInfo({})
  setViewVisible({})
  setZoomFactor(ZOOM_INIT)
  setViewPosition({ x: X_INIT, y: Y_INIT })
  setMinimapUntoggled(true)
  setMinimapEnabled(false)
  history.push(
    internalExploreURL({
      model: currentModel.name,
      explore: currentExplore.value,
    })
  )
}

/**
 * gets the background color for each ExploreListItem
 * @param exploreNameSel - name of the explore list item
 * @param currentExplore - current url explore obj
 * @param diagramExplore - current diagrammed explore obj
 */
export function getExploreListItemBackgroundColor(
  exploreNameSel: string,
  currentExplore: ILookmlModelExplore,
  diagramExplore: string
) {
  if (currentExplore && currentExplore.name === exploreNameSel) {
    return OVERRIDE_KEY_SUBTLE
  }
  if (diagramExplore === exploreNameSel) {
    return OVERRIDE_KEY_SUBTLE
  }
  return undefined
}

/**
 * prepares the Git Branch dropdown data
 * @param gitBranch - currently selected branch obj
 * @param gitBranches - list of available branch objs
 */
export const getBranchOptions = (
  gitBranch: IGitBranch,
  gitBranches: IGitBranch[]
): SelectOptionProps[] => {
  return gitBranches?.map((branch: IGitBranch) => {
    return gitBranch.name === branch.name
      ? {
          value: branch.name,
          label: branch.name,
          icon: <GitBranch />,
        }
      : {
          value: branch.name,
          label: branch.name,
          icon: undefined,
        }
  })
}
