// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import type {
  ILookmlModel,
  ILookmlModelExplore,
} from '@looker/sdk/lib/4.0/models'
import type { SelectionInfoPacket } from '../interfaces'
import type { DetailedModel } from '../../utils/fetchers'
import type { DiagrammedModel } from '../../utils/LookmlDiagrammer/'

export interface DiagramFrameProps {
  unfilteredModels: ILookmlModel[]
  pathModelName: string
  pathExploreName: string
  modelDetail: DetailedModel
  dimensions: DiagrammedModel[]
  hiddenToggle: boolean
  setHiddenToggle: (t: boolean) => void
  displayFieldType: string
  setDisplayFieldType: (s: string) => void
}

export interface DiagramHeaderProps {
  currentExplore: ILookmlModelExplore
  selectionInfo: SelectionInfoPacket
  toggleExploreInfo: () => void
}
