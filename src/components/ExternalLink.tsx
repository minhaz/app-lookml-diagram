// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import React, { useContext } from 'react'
import type { LinkProps } from '@looker/components'
import { Link } from '@looker/components'
import type { Looker40SDK } from '@looker/sdk'
import type { ExtensionContextData2 } from '@looker/extension-sdk-react'
import { ExtensionContext2 } from '@looker/extension-sdk-react'

export const ExternalLink: React.FC<Omit<LinkProps, 'color'>> = ({
  href,
  target,
  onClick,
  ...rest
}) => {
  const extensionContext = useContext<ExtensionContextData2<Looker40SDK>>(
    ExtensionContext2
  )
  const { extensionSDK } = extensionContext
  const onLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    // probably don't need to call this as href is no longer added to the Link
    event.stopPropagation()
    if (href) {
      extensionSDK.updateLocation(href, undefined, target)
    } else if (onClick) {
      onClick(event)
    }
  }

  return <Link onClick={onLinkClick} {...rest} />
}
