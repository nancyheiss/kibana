/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';

import { EuiPageHeader, EuiButton } from '@elastic/eui';

import { docLinks } from '../../../shared/doc_links';

import { DocumentCreationButtons, DocumentCreationFlyout } from '../document_creation';

import { EmptyEngineOverview } from './engine_overview_empty';

describe('EmptyEngineOverview', () => {
  let wrapper: ShallowWrapper;

  beforeAll(() => {
    wrapper = shallow(<EmptyEngineOverview />);
  });

  it('renders', () => {
    expect(wrapper.find(EuiPageHeader).prop('pageTitle')).toEqual('Engine setup');
  });

  it('renders a documentation link', () => {
    const header = wrapper.find(EuiPageHeader).dive().children().dive();
    expect(header.find(EuiButton).prop('href')).toEqual(`${docLinks.appSearchBase}/index.html`);
  });

  it('renders document creation components', () => {
    expect(wrapper.find(DocumentCreationButtons)).toHaveLength(1);
    expect(wrapper.find(DocumentCreationFlyout)).toHaveLength(1);
  });
});
