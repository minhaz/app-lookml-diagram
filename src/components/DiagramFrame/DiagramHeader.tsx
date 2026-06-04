// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import React from 'react'
import { Heading, Space, IconButton } from '@looker/components'
import { useQueryClient } from 'react-query'
import { Info, Refresh } from '@styled-icons/material-outlined'

import { OVERRIDE_KEY_SUBTLE, OVERRIDE_KEY } from '../../utils/constants'
import type { DiagramHeaderProps } from './types'
import { DiagramHeaderWrapper } from './FrameHelpers'

export const DiagramHeader: React.FC<DiagramHeaderProps> = ({
  currentExplore,
  selectionInfo,
  toggleExploreInfo,
}) => {
  const queryClient = useQueryClient()
  const reloadPage = () => queryClient.resetQueries()

  const exploreInfoStyles =
    selectionInfo.lookmlElement === 'explore'
      ? { color: OVERRIDE_KEY, backgroundColor: OVERRIDE_KEY_SUBTLE }
      : {}

  return (
    <DiagramHeaderWrapper
      py="xsmall"
      px="large"
      className={currentExplore ? 'has-explore' : 'no-explore'}
    >
      <Space between>
        <Space gap="xsmall">
          <Heading as="h1" px="1rg">
            {currentExplore && currentExplore.label}
          </Heading>
        </Space>
        <Space gap="xsmall" justifyContent="flex-end">
          <IconButton
            label="Explore Info"
            icon={<Info />}
            onClick={toggleExploreInfo}
            style={exploreInfoStyles}
            size="large"
          />
          <IconButton
            label="Reload Diagram"
            icon={<Refresh />}
            size="large"
            onClick={reloadPage}
          />
        </Space>
      </Space>
    </DiagramHeaderWrapper>
  )
}
