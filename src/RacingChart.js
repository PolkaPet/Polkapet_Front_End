import { React, useState, useEffect, useCallback } from 'react'
import ChartRace from 'react-chart-race'
import { useSubstrateState } from './substrate-lib'
import { getOvalBostNumber } from './utils'
import useInterval from 'use-interval'

const color = ['#50c4fe', '#3fc42d', '#c33178', '#423bce', '#c8303b', '#2c2c2c']

function RacingChart() {
  const { api } = useSubstrateState()

  const [point, setPoint] = useState(null)
  console.log('point', point)
  const fetchData = useCallback(async () => {
    let num = await getOvalBostNumber(api)
    num =
      num &&
      Object.entries(num).map(([title, value], idx) => {
        return { id: idx + 1, title, value, color: color[idx] }
      })
    setPoint([...num])
  }, [api])

  useEffect(() => {
    api && fetchData()
  }, [api, fetchData])

  useInterval(() => fetchData(), 1000)

  return (
    <div>
      {point && (
        <ChartRace
          data={point}
          backgroundColor="#000"
          width={760}
          padding={12}
          itemHeight={58}
          gap={12}
          titleStyle={{ font: 'normal 400 13px Arial', color: '#fff' }}
          valueStyle={{
            font: 'normal 400 11px Arial',
            color: 'rgba(255,255,255, 0.42)',
          }}
        />
      )}

      {/* <button onClick={handleChange}>Click Me!</button> */}
    </div>
  )
}

export default RacingChart
