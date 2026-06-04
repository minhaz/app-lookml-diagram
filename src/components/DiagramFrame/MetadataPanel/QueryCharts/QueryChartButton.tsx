// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import React from 'react'
import { theme, ButtonOutline, FlexItem } from '@looker/components'
import { Cached } from '@styled-icons/material'
import styled from 'styled-components'

const DisabledText = styled.div`
  font-size: ${theme.fontSizes.xsmall};
  color: ${theme.colors.text2};
  margin-top: 1rem;
`

export const QueryChartButton: React.FC<{
  disabledText: string
  enabled: boolean
  onClick: () => void
  title: string
}> = ({ disabledText, enabled, onClick }) => {
  return (
    <FlexItem>
      <ButtonOutline
        iconBefore={<Cached />}
        onClick={onClick}
        disabled={!enabled}
      >
        Calculate
      </ButtonOutline>
      {!enabled ? <DisabledText>{disabledText}</DisabledText> : null}
    </FlexItem>
  )
}
