// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import styled from 'styled-components'
import { Aside, Section, Header } from '@looker/components'
import { DIAGRAM_HEADER_HEIGHT } from '../../utils/constants'

export const Italics = styled.span`
  font-style: italic;
`

export const Rail = styled(Aside as any)`
  border-right: solid 1px ${(props) => props.theme.colors.ui2};
  align-items: center;
  overflow: hidden;
`

export const DiagramHeaderWrapper = styled(Header as any)`
  background-color: ${(props) => props.theme.colors.background};
  border-bottom: solid 1px ${(props) => props.theme.colors.ui2};
  transition: transform 500ms ease-out;
  position: relative;
  z-index: 1;

  &.no-explore {
    transform: translateY(-${DIAGRAM_HEADER_HEIGHT}px);
  }

  &.has-explore {
    transform: translateY(0);
  }
`

export const Stage = styled(Section as any)`
  background-color: ${(props) => props.theme.colors.ui1};
  overflow: hidden;
  position: relative;
`
