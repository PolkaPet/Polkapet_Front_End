import React, { useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'

import { useSubstrateState } from './substrate-lib'
import { convertCamelCase, getOvalBostNumber } from './utils'



export default function OvalBostNumber(props) {
  const { api } = useSubstrateState()

  const [ovalBostNumber, setOvalBostNumber] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const num = await getOvalBostNumber(api)

      setOvalBostNumber(num)
    }

    api && fetchData()
  }, [api])

  return (
    <Grid.Column style={{ color: 'white' }} width={16}>
      <h1>Oval Boost Number</h1>
      <div>
        {ovalBostNumber &&
          Object.entries(ovalBostNumber).map(([k, v]) => {
            return (
              <p>
                {convertCamelCase(k)} : {v}
              </p>
            )
          })}
      </div>{' '}
    </Grid.Column>
  )
}
