// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import styled from 'styled-components'
import { theme } from '@looker/components'
import { OVERRIDE_KEY_SUBTLE } from '../../../../utils/constants'

export const ExploreListWrapper = styled.ul`
  margin-top: ${theme.sizes.xxxsmall};
  overflow: auto;
  width: 100%;
`
export const ExploreListitem = styled.li`
  border-bottom: solid 1px ${theme.colors.ui2};
`
export const ExploreButton = styled.button`
  all: inherit;
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text5};
  cursor: pointer;
  padding: ${theme.sizes.xxxsmall};
  width: 100%;
  border: none;
  &:hover {
    background-color: ${OVERRIDE_KEY_SUBTLE};
  }
  & > * {
    pointer-events: none;
  }
`
