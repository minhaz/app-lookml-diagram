// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import React from 'react'
import { useHistory } from 'react-router'
import type { ExploreDropdown } from '../types'
import type { ExploreListProps } from './types'
import { handleExploreChange, getExploreListItemBackgroundColor } from './utils'
import {
  ExploreListWrapper,
  ExploreListitem,
  ExploreButton,
} from './list_components'

export const ExploreList: React.FC<ExploreListProps> = ({
  currentModel,
  selectionInfo,
  exploreList,
  currentExplore,
  diagramExplore,
  setSelectionInfo,
  setViewVisible,
  setZoomFactor,
  setViewPosition,
  setMinimapUntoggled,
  setMinimapEnabled,
}) => {
  const history = useHistory()
  return (
    <ExploreListWrapper>
      {exploreList &&
        exploreList.map((explore: ExploreDropdown, index: number) => {
          return (
            <ExploreListitem
              key={`explore-${index}`}
              style={{
                backgroundColor: getExploreListItemBackgroundColor(
                  explore.value,
                  currentExplore,
                  diagramExplore
                ),
              }}
            >
              <ExploreButton
                onClick={() =>
                  handleExploreChange(
                    history,
                    currentModel,
                    explore,
                    selectionInfo,
                    setSelectionInfo,
                    setViewVisible,
                    setZoomFactor,
                    setViewPosition,
                    setMinimapUntoggled,
                    setMinimapEnabled
                  )
                }
                value={explore.value}
              >
                {explore.label}
              </ExploreButton>
            </ExploreListitem>
          )
        })}
    </ExploreListWrapper>
  )
}
