// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

export interface ViewOptionsProps {
  displayFieldType: any
  hiddenToggle: any
  viewVisible: any
  setViewVisible: (visible: any) => void
  handleHiddenToggle: (toggle: React.FormEvent<HTMLInputElement>) => void
  setDisplayFieldType: (types: any) => void
}

export interface ExploreDropdown {
  value: string
  label: string
}
