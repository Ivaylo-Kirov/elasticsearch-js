/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildClusterAllocationExplain (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [cluster.allocation_explain](http://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-allocation-explain.html) request
   *
   * @param {boolean} include_yes_decisions - Return 'YES' decisions in explanation (default: false)
   * @param {boolean} include_disk_info - Return information about disk usage and shard sizes (default: false)
   * @param {object} body - The index, shard, and primary flag to explain. Empty means 'explain the first unassigned shard'
   */

  const acceptedQuerystring = [
    'include_yes_decisions',
    'include_disk_info',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    includeYesDecisions: 'include_yes_decisions',
    includeDiskInfo: 'include_disk_info',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function clusterAllocationExplain (params, options, callback) {
    options = options || {}
    if (typeof options === 'function') {
      callback = options
      options = {}
    }
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
      options = {}
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    path = '/' + '_cluster' + '/' + 'allocation' + '/' + 'explain'

    // build request object
    const request = {
      method,
      path,
      body: body || '',
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildClusterAllocationExplain
