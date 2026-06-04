// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import React from 'react'
import {
  Footer,
  Badge,
  Aside,
  Code,
  Flex,
  FlexItem,
  Heading,
  Text,
  theme,
} from '@looker/components'
import styled from 'styled-components'

import { METADATA_PANEL_PIXEL } from '../../../utils/constants'

/**
 * Layout component for metadata panel Footer
 */
export const MetadataFooter = styled(Footer)`
  width: ${METADATA_PANEL_PIXEL}px;
  right: -1px;
  position: absolute;
  bottom: 0px;
  border-top-color: transparent;
  box-shadow: 0px 1px 15px ${(props) => props.theme.colors.ui2};
  background-color: ${(props) => props.theme.colors.background};
  border-top: 1px solid ${(props) => props.theme.colors.background};
`
// eslint-disable-next-line no-restricted-properties
MetadataFooter.defaultProps = {
  py: 'small',
}

/**
 * Layout component for metadata panel Panel
 */
export const MetadataInfoPanel = styled(Aside)`
  border-left: solid 1px ${(props) => props.theme.colors.ui2};
  overflow-y: auto;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: -10px 0px 20px 0px ${(props) => props.theme.colors.ui2};
  z-index: 0;
`
// eslint-disable-next-line no-restricted-properties
MetadataInfoPanel.defaultProps = {
  width: `${METADATA_PANEL_PIXEL}px`,
  px: 'medium',
  py: 'large',
}

/**
 * Layout component for Key/Values in metadata panel table
 */
export const MetadataRow = styled(Flex)`
  border-bottom: solid 1px ${theme.colors.ui2};
`
// eslint-disable-next-line no-restricted-properties
MetadataRow.defaultProps = {
  py: 'small',
  width: '100%',
}

/**
 * Applies monospace font to value text
 */
export const CodeText = styled(Text)`
  font-family: monospace;
  font-weight: 400;
`
/**
 * Generic metadata panel value text
 */
export const ValueText = styled(Text)`
  font-weight: 400;
`
/**
 * Layout component for metadata panel table Keys
 */
export const KeyColumn: React.FC = ({ children }) => {
  return <FlexItem flexBasis="35%">{children}</FlexItem>
}

/**
 * Layout component for metadata panel table Values
 */
export const ValueColumn: React.FC = ({ children }) => {
  return <FlexItem flexBasis="65%">{children}</FlexItem>
}

/**
 * Generic metadata panel key text
 */
export const KeyText: React.FC = ({ children }) => {
  return (
    <Text fontSize="small" fontWeight="medium">
      {children}
    </Text>
  )
}

/**
 * Lightened metadata panel key text for subpoints
 */
export const SubKeyText: React.FC = ({ children }) => {
  return (
    <Text fontSize="small" fontWeight="semiBold" color="secondary">
      {children}
    </Text>
  )
}

/**
 * Generic pill text
 */
export const PillText: React.FC = ({ children }) => {
  return (
    <Code color="text3" fontSize="xsmall" lineHeight="medium">
      {children}
    </Code>
  )
}

/**
 * Generic header for metadata panel
 */
export const MetadataHeading: React.FC = ({ children }) => {
  return <Heading fontSize="xlarge">{children}</Heading>
}

/**
 * Layout component for metadata panel pills
 */
export const PillWrapper: React.FC = ({ children }) => {
  return (
    <Badge intent="neutral" size="small">
      {children}
    </Badge>
  )
}
