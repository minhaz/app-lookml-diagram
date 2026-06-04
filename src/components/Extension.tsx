// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import React, { useContext } from 'react'
import { ComponentsProvider } from '@looker/components'
import type { Looker40SDK } from '@looker/sdk'
import type { ExtensionContextData2 } from '@looker/extension-sdk-react'
import { ExtensionContext2 } from '@looker/extension-sdk-react'
import { useSelectExplore, usePathNames } from '../utils/routes'
import {
  VIEW_OPTIONS_HIDDEN_DEFAULT,
  VIEW_OPTIONS_FIELDS_DEFAULT,
} from '../utils/constants'
import { DiagramFrame } from './DiagramFrame/DiagramFrame'

export const Extension: React.FC = () => {
  const extensionContext = useContext<ExtensionContextData2<Looker40SDK>>(
    ExtensionContext2
  )
  const { extensionSDK } = extensionContext
  const extensionHost = (extensionSDK.lookerHostData || {}).hostType
  const fontOverride =
    !extensionHost || extensionHost === 'standard'
      ? { fontFamilies: { brand: 'Google Sans' } }
      : {}
  const { modelName, exploreName } = usePathNames()
  const [hiddenToggle, setHiddenToggle] = React.useState(
    VIEW_OPTIONS_HIDDEN_DEFAULT
  )
  const [displayFieldType, setDisplayFieldType] = React.useState(
    VIEW_OPTIONS_FIELDS_DEFAULT
  )
  const { unfilteredModels, modelDetail, dimensions } = useSelectExplore(
    hiddenToggle,
    displayFieldType
  )
  return (
    <ComponentsProvider
      themeCustomizations={{
        colors: { key: 'rgb(45, 126, 234)' },
        ...fontOverride,
      }}
    >
      {/* Check out ./src/component_structure.png for a diagram of the app structure */}
      <DiagramFrame
        unfilteredModels={unfilteredModels}
        pathModelName={modelName}
        pathExploreName={exploreName}
        modelDetail={modelDetail}
        dimensions={dimensions}
        hiddenToggle={hiddenToggle}
        setHiddenToggle={setHiddenToggle}
        displayFieldType={displayFieldType}
        setDisplayFieldType={setDisplayFieldType}
      />
    </ComponentsProvider>
  )
}
