// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import React from 'react'
import { SpaceVertical, FadeIn, Divider, Label } from '@looker/components'
import { ExternalLink } from '../../ExternalLink'
import { Diagram } from '../DiagramCanvas/Diagram'
import { Italics } from '../FrameHelpers'
import {
  view_explore,
  view_dimensions,
  join_dimensions,
  join_explore,
} from './HelpPanelData'
import { SettingsPanel, HelpBody, PanelHeading } from './frame_components'

const noop = () => {
  // noop
}

export const HelpPanel: React.FC = () => {
  return (
    <SettingsPanel>
      <FadeIn duration="intricate">
        <SpaceVertical>
          <PanelHeading>Diagram Help</PanelHeading>
          <Label>Views</Label>
          <Diagram
            type={'help-view'}
            dimensions={view_dimensions.diagramDict}
            explore={view_explore}
            reload={false}
            selectionInfo={{}}
            setSelectionInfo={undefined}
            hiddenToggle={true}
            displayFieldType={'all'}
            viewVisible={{ order_items: true }}
            zoomFactor={0.479}
            setZoomFactor={noop}
            viewPosition={{
              x: 55.98,
              y: -86,
              displayX: 0,
              displayY: 0,
              clientWidth: 375,
              clientHeight: 155,
            }}
            setViewPosition={noop}
          />
          <HelpBody>
            The base view is indicated by a dark blue header. In each view
            table, dimension rows are white; measure rows are light orange.
          </HelpBody>
          <HelpBody>
            To the left of each field is an icon representing its type. If the
            field is a primary key, a key icon appears to the right of the field
            name.
          </HelpBody>
          <HelpBody>Click on a table row to see its metadata.</HelpBody>
          <Divider appearance="light" />
          <Label>Joins</Label>
          <Diagram
            type={'help-join'}
            dimensions={join_dimensions.diagramDict}
            explore={join_explore}
            reload={false}
            selectionInfo={{
              lookmlElement: 'join',
              name: 'forecast',
            }}
            setSelectionInfo={undefined}
            hiddenToggle={true}
            displayFieldType={'all'}
            viewVisible={{ polling: true, forecast: true }}
            zoomFactor={0.249}
            setZoomFactor={noop}
            viewPosition={{
              x: 10.12,
              y: -15.54,
              displayX: 0,
              displayY: 0,
              clientWidth: 375,
              clientHeight: 190,
            }}
            setViewPosition={noop}
          />
          <HelpBody>
            Joins are represented by a directed line that connects two views.
            Joined views are indicated by a light blue header.
          </HelpBody>
          <HelpBody>
            The shape of the line, where it attaches to the view or field,
            conveys the cardinality of the relationship between the two objects;
            a forked line indicates a “many” cardinality, and a single line
            indicates a “one” cardinality. You would read the relationship as{' '}
            <Italics>from</Italics> the base view <Italics>to</Italics> the
            joined view.
          </HelpBody>
          <HelpBody>
            Hover over a join to see its join relationship type. Click on a join
            line to see its metadata.
          </HelpBody>
          <ExternalLink
            fontSize="small"
            target="_blank"
            href="https://docs.looker.com/data-modeling/extension-framework/lookml-diagram"
          >
            Full documentation.
          </ExternalLink>
        </SpaceVertical>
      </FadeIn>
    </SettingsPanel>
  )
}
