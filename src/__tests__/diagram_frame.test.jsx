// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import React from "react"
import { GitBranch } from "@looker/icons"
import {getBranchOptions} from "../components/DiagramFrame/FramePanels/SettingsPanel/utils"
import {formatZoom} from "../components/DiagramFrame/DiagramCanvas/utils"
import { theme } from "@looker/components"

test('git branches load', () => {
  expect(getBranchOptions({name: "main"}, [{name: "main"}, {name: "main1"}, {name: "main2"}])).toEqual([
    {value: "main", label: "main", icon: <GitBranch/>},{value: "main1", label: "main1"},{value: "main2", label: "main2"}
  ]);
});

test('zoom 0', () => {
  expect(formatZoom(0)).toEqual("0%")
})

test('zoom 1', () => {
  expect(formatZoom(1)).toEqual("100%")
})

test('zoom .66', () => {
  expect(formatZoom(.66)).toEqual("70%")
})

test('zoom .33', () => {
  expect(formatZoom(.33)).toEqual("30%")
})


