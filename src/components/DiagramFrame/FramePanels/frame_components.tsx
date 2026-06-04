// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import React from 'react'
import styled from 'styled-components'
import { Aside, Paragraph, Heading, theme } from '@looker/components'
import { OVERRIDE_KEY_SUBTLE } from '../../../utils/constants'

export const SettingsPanel = styled(Aside)`
  border-right: solid 1px ${theme.colors.ui2};
  overflow-y: auto;
  height: 100%;
  overflow-x: scroll;
`

// eslint-disable-next-line no-restricted-properties
SettingsPanel.defaultProps = {
  width: '275px',
  px: 'medium',
  py: 'large',
}

export const ViewList = styled.ul`
  overflow-y: auto;
  margin: 0;
`
export const ViewListItem = styled.li`
  border-bottom: solid 1px ${theme.colors.ui2};
`
export const ViewButton = styled.button`
  all: inherit;
  font-size: ${theme.fontSizes.small};
  cursor: pointer;
  padding: 12px 12px;
  width: 100%;
  border: none;
  :hover {
    background-color: ${OVERRIDE_KEY_SUBTLE};
  }
  & > * {
    pointer-events: none;
  }
`
export const HelpBody: React.FC = ({ children }) => {
  return <Paragraph fontSize="small">{children}</Paragraph>
}

export const PanelHeading: React.FC = ({ children }) => {
  return (
    <Heading fontSize="large" color={theme.colors.text4}>
      {children}
    </Heading>
  )
}
