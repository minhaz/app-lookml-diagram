// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import {database_simple_view_explore, database_simple_view_output} from "./test_data/diagrams_basic"
import {model_few_views_explore, model_few_views_output} from "./test_data/diagrams_polls"
import {github_commit_explore, github_commit_dimensions} from "./test_data/github_commit"
import {github_pr_explore, github_pr_dimensions} from "./test_data/github_pr"
import {diagrams_gov_explore, diagrams_gov_dimensions} from "./test_data/diagrams_gov"
import {diagrams_universe_explore, diagrams_universe_dimensions} from "./test_data/diagrams_universe"
import {bigquery_block_explore, bigquery_block_dimensions} from "./test_data/bigquery_block"
import {generateExploreDiagram} from "../utils/LookmlDiagrammer"

const cases = [
  [
    database_simple_view_explore,
    database_simple_view_output,
    true,
    "all"
  ],
  [
    model_few_views_explore,
    model_few_views_output,
    true,
    "all"
  ],
  [
    github_commit_explore,
    github_commit_dimensions,
    true,
    "all"
  ],
  [
    github_pr_explore,
    github_pr_dimensions,
    false,
    "joined"
  ],
  [
    diagrams_gov_explore,
    diagrams_gov_dimensions,
    true,
    "all"
  ],
  [
    diagrams_universe_explore,
    diagrams_universe_dimensions,
    false,
    "all"
  ],
  [
    bigquery_block_explore,
    bigquery_block_dimensions,
    true,
    "all"
  ]
]

describe('Diagram generation', () => {
  test.each(cases)(
    'it can generate the expected diagram',
    (input, output, hiddenFields, fieldType) => {
      const inputExplore = JSON.parse(decodeURI(input))
      const generated = generateExploreDiagram(
        inputExplore,
        hiddenFields,
        fieldType
      )
      const testCase = JSON.parse(decodeURI(output))
      expect(generated).toEqual(testCase)
    }
  )
})
