// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import React from 'react'
import { shallow } from 'enzyme'
import JoinIcon from '../../components/DiagramFrame/MetadataPanel/JoinIcon'

describe('left outer <JoinIcon />', () => {
  const container = shallow(<JoinIcon type="left_outer" />)
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })
})

describe('inner <JoinIcon />', () => {
  const container = shallow(<JoinIcon type="inner" />)
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })
})

describe('full outer <JoinIcon />', () => {
  const container = shallow(<JoinIcon type="full_outer" />)
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })
})

describe('cross <JoinIcon />', () => {
  const container = shallow(<JoinIcon type="cross" />)
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot()
  })
})
