// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import React from 'react'
import { Box, Text, Flex, FlexItem } from '@looker/components'

export const MetadataItem = ({
  aux,
  children,
  compact,
}: {
  label: string
  aux?: string
  children: React.ReactNode
  compact?: boolean
}) => {
  if (compact) {
    return (
      <Flex>
        <FlexItem textAlign="right" flex="1 1 auto">
          <Text fontSize="small">{children}</Text>
        </FlexItem>
      </Flex>
    )
  } else {
    return (
      <Box>
        <Box>
          <Flex>
            {aux && (
              <FlexItem textAlign="right" flex="1 1 auto">
                <Text fontSize="small">{aux}</Text>
              </FlexItem>
            )}
          </Flex>
        </Box>
        <Box>
          <Text fontSize="small">{children}</Text>
        </Box>
      </Box>
    )
  }
}
