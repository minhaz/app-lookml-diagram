// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import React from 'react'
import styled from 'styled-components'
import { Card, Paragraph, Section, theme } from '@looker/components'
import { MINIMAP_WIDTH } from '../../../../utils/constants'

/**
 * Layout component for Toolbar. Floats to bottom left of container
 */
export const Toolbar = styled(Card)`
  left: 20px;
  bottom: 80px;
  position: absolute;
  border-color: transparent;
  :hover {
    border-color: transparent;
  }
`

// eslint-disable-next-line no-restricted-properties
Toolbar.defaultProps = {
  height: 'auto',
  width: '40px',
  minWidth: '40px',
}

/**
 * Top level layout component for the DiagramCanvas
 */
export const DiagramCanvasWrapper = styled(Section)`
  background: ${(props) => props.theme.colors.ui1};
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

/**
 * Text component for empty state description
 */
export const IntroText: React.FC = ({ children }) => {
  return (
    <Paragraph
      textAlign="center"
      maxWidth="30%"
      mt="1em"
      color={theme.colors.text1}
    >
      {children}
    </Paragraph>
  )
}

/**
 * Text component for error state text
 */
export const ErrorText: React.FC = ({ children }) => {
  return (
    <Paragraph
      textAlign="center"
      maxWidth="40%"
      mt="1em"
      color={theme.colors.text1}
    >
      {children}
    </Paragraph>
  )
}

export const Minimap = styled(Card)`
  right: 20px;
  top: 20px;
  position: absolute;
  border-color: white;
  border-width: 3px;
  :hover {
    border-color: white;
  }
`

// eslint-disable-next-line no-restricted-properties
Minimap.defaultProps = {
  minWidth: `${MINIMAP_WIDTH}px`,
  width: `${MINIMAP_WIDTH}px`,
  height: 'auto',
}
