// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import { theme } from '@looker/components'

/**
 * get the color of a view list item according to its visibility status
 * @param disabled - whether or not the current view is disabled
 */
export function getViewListItemColor(disabled: boolean) {
  return disabled ? undefined : theme.colors.text1
}
