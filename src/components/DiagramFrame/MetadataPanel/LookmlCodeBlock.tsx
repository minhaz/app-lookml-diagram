// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import type { FC } from 'react'
import React from 'react'
import styled from 'styled-components'
import { Span, theme } from '@looker/components'
import Highlight, { defaultProps } from 'prism-react-renderer'
import prismTheme from 'prism-react-renderer/themes/nightOwlLight'

interface LookmlCodeBlockProps {
  /** Code blob to be highlighted */
  code: string
}

const Pre = styled.pre`
  padding: ${theme.sizes.xsmall};
  white-space: pre-wrap;
  overflow: auto;
  // override default margin for Pre
  // so we can set from parent
  margin: 0px;
  width: 100%;
`

const Line = styled.div`
  display: table-row;
`

const LineNo = styled(Span)`
  display: table-cell;
  text-align: right;
  user-select: none;
  opacity: 0.5;
`
// eslint-disable-next-line no-restricted-properties
LineNo.defaultProps = {
  pr: 'small',
}

const LineContent = styled(Span)`
  display: table-cell;
  font-family: monospace;
`
const lookmlKeywords = [
  'join',
  'type',
  'relationship',
  'sql_on',
  'dimension',
  'dimension_group',
  'sql',
  'measure',
  'timeframes',
  'value_format',
  'primary_key',
]

/**
 * Provides a (partial) LookML syntax highlighter.
 */
export const LookmlCodeBlock: FC<LookmlCodeBlockProps> = ({ code }) => {
  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={'json'}
      theme={prismTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <Line key={i} {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              <LineContent>
                {line.map((token, key) => {
                  const { children, ...tokenProps } = getTokenProps({
                    token,
                    key,
                  })
                  if (lookmlKeywords.includes(children.trim())) {
                    tokenProps.style = {
                      ...tokenProps.style,
                      color: 'rgb(12, 150, 155)',
                    }
                  }
                  return (
                    <span key={key} {...tokenProps}>
                      {children}
                    </span>
                  )
                })}
              </LineContent>
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  )
}
