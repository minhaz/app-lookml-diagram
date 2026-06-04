// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import React from 'react'
import * as ReactDOM from 'react-dom'
import { ExtensionProvider2 } from '@looker/extension-sdk-react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Looker40SDK } from '@looker/sdk'
import { Extension } from './components/Extension'

window.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div')
  const queryClient = new QueryClient()
  document.body.appendChild(root)
  ReactDOM.render(
    <ExtensionProvider2 type={Looker40SDK} chattyTimeout={300000}>
      <QueryClientProvider client={queryClient}>
        <Extension />
      </QueryClientProvider>
    </ExtensionProvider2>,
    root
  )
})
