// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import type {
  ILookmlModel,
  ILookmlModelExplore,
} from '@looker/sdk/lib/4.0/models'
import type { SelectOptionProps } from '@looker/components'
import type {
  SelectionInfoPacket,
  VisibleViewLookup,
} from '../../../interfaces'
import type { ExploreDropdown } from '../types'
import type { DetailedModel } from '../../../../utils/fetchers'

export interface ExploreListProps {
  currentModel: ILookmlModel
  exploreList: ExploreDropdown[]
  selectionInfo: SelectionInfoPacket
  currentExplore: ILookmlModelExplore
  diagramExplore: string
  setSelectionInfo: (info: SelectionInfoPacket) => void
  setViewVisible: (visible: VisibleViewLookup) => void
  setZoomFactor: (zoom: number) => void
  setViewPosition: (info: any) => void
  setMinimapUntoggled: (toggle: boolean) => void
  setMinimapEnabled: (toggle: boolean) => void
}

export interface DiagramSettingsProps {
  modelPathName: string
  explorePathName: string
  modelDetails: SelectOptionProps[]
  exploreList: ExploreDropdown[]
  modelDetail: DetailedModel
  selectionInfo: SelectionInfoPacket
  currentExplore: ILookmlModelExplore
  diagramExplore: string
  setSelectionInfo: (info: SelectionInfoPacket) => void
  setViewVisible: (visible: VisibleViewLookup) => void
  setZoomFactor: (zoom: number) => void
  setViewPosition: (info: any) => void
  setMinimapUntoggled: (toggle: boolean) => void
  setMinimapEnabled: (toggle: boolean) => void
}
