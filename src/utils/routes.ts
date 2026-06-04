// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import { useRouteMatch } from 'react-router-dom'
import type { DetailedModel } from './fetchers'
import {
  useAllModels,
  useLookmlModelExplores,
  useAvailableGitBranches,
  useCurrentGitBranch,
  useModelDiagrams,
} from './fetchers'

export function internalExploreURL({
  model,
  explore,
  field,
  tab,
}: {
  model: string
  explore: string
  field?: string
  tab?: string
}) {
  let url = `/models/${encodeURIComponent(model)}/explores/${encodeURIComponent(
    explore
  )}`
  if (field) {
    url = `${url}/field/${encodeURIComponent(field)}`
  }
  if (tab) {
    url = `${url}/pane/${encodeURIComponent(tab)}`
  }
  return url
}

export function relationshipsURL({ model }: { model: string }) {
  return `/models/${encodeURIComponent(model)}/relationships`
}

export function internalModelURL({ model }: { model: string }) {
  return `/models/${encodeURIComponent(model)}`
}

export function usePathNames(): {
  modelName?: string
  exploreName?: string
  fieldName?: string
  detailPane?: string
  fullPage: any
} {
  const match =
    useRouteMatch<{ model: string }>({
      path: '/models/:model',
      sensitive: true,
    }) || undefined

  const match2 =
    useRouteMatch<{ model: string; explore: string }>({
      path: '/models/:model/explores/:explore',
      sensitive: true,
    }) || undefined

  const match3 =
    useRouteMatch<{
      model: string
      explore: string
      field: string
      tab: string
    }>({
      path: '/models/:model/explores/:explore/field/:field/pane/:tab',
    }) || undefined

  const renderMatch = useRouteMatch({
    path: '/models/:model/explores/:explore/render',
    sensitive: true,
  })

  return {
    modelName: match && match.params.model,
    exploreName: match2 && match2.params.explore,
    fieldName: match3 && match3.params.field,
    detailPane: match3 && match3.params.tab,
    fullPage: renderMatch,
  }
}

export function useCurrentModel() {
  const { modelName } = usePathNames()
  const modelData = useAllModels()
  const currentModel = modelData && modelData.find((m) => m.name === modelName)
  return currentModel
}

export function useSelectExplore(
  hiddenToggle: boolean,
  displayFieldType: string
) {
  const unfilteredModels = useAllModels()
  const model = useCurrentModel()
  const { explores, modelExploreError } = useLookmlModelExplores(model)
  const { gitBranch, branchError } = useCurrentGitBranch(model?.project_name)
  const { gitBranches, branchesError } = useAvailableGitBranches(
    model?.project_name
  )
  const fetchError = modelExploreError || branchError || branchesError
  const modelDetail: DetailedModel = {
    model,
    explores,
    gitBranch,
    gitBranches,
    fetchError,
  }
  const dimensions = useModelDiagrams(
    modelDetail,
    hiddenToggle,
    displayFieldType
  )
  return {
    unfilteredModels,
    modelDetail,
    dimensions,
  }
}
