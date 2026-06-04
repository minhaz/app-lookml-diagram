// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import React from 'react'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { HelpPanel } from '../../components/DiagramFrame/FramePanels/HelpPanel'
import { renderWithExtensionContext } from '../test-utils/render_with_extension'

jest.mock('../../components/DiagramFrame/DiagramCanvas/Diagram', () => ({
  Diagram: () => 'Diagram',
}))

describe('HelpPanel', () => {
  test('it renders documentation', () => {
    renderWithExtensionContext(<HelpPanel />)
    expect(
      screen.getByText(
        'The base view is indicated by a dark blue header. In each view table, dimension rows are white; measure rows are light orange.'
      )
    ).toBeInTheDocument()
  })
})
