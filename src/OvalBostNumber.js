import React, { useCallback, useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'

import { useSubstrateState } from './substrate-lib'
import { convertCamelCase, getOvalBostNumber } from './utils'
import useInterval from 'use-interval'

export default function OvalBostNumber(props) {
  const { api } = useSubstrateState()

  const [ovalBostNumber, setOvalBostNumber] = useState(null)

  const fetchData = useCallback(async () => {
    const num = await getOvalBostNumber(api)
    setOvalBostNumber(num)
  }, [api])

  useEffect(() => {
    api && fetchData()
  }, [api, fetchData])

  useInterval(() => fetchData(), 1000)

  return (
    <Grid.Column style={{ color: 'white' }} width={16}>
      <h1>Oval Boost Number</h1>
      <div>
        {ovalBostNumber &&
          Object.entries(ovalBostNumber).map(([k, v]) => {
            return (
              <p key={k}>
                {convertCamelCase(k)} : {v}
              </p>
            )
          })}
      </div>{' '}
    </Grid.Column>
  )
}
