import { React, useState, useEffect, useCallback } from 'react'
import ChartRace from 'react-chart-race'
import { useSubstrateState } from './substrate-lib'
import { getOvalBostNumber } from './utils'
import useInterval from 'use-interval'

const color = ['#50c4fe', '#3fc42d', '#c33178', '#423bce', '#c8303b', '#2c2c2c']

function RacingChart() {
  const { api } = useSubstrateState()

  const [point, setPoint] = useState(null)

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
  const data = [
    {
      id: 0,
      title: (
        <img
          style={{ width: '40px' }}
          class="ui small image"
          src="https://placehold.co/5x5"
          alt="asd"
        />
      ),
      value: 91,
      color: '#50c4fe',
    },
    { id: 1, title: <strong>'Kayseri'</strong>, value: 38, color: '#3fc42d' },
    {
      id: 2,
      title: <strong>'Muğla'</strong>,
      value: 41,
      color: '#c33178',
    },
    {
      id: 3,
      title: <strong>'Uşak'</strong>,
      value: 81,
      color: '#423bce',
    },
    { id: 4, title: <strong>'Sivas'</strong>, value: 58, color: '#c8303b' },
    { id: 5, title: <strong>'Konya'</strong>, value: 16, color: '#2c2c2c' },
  ]
  return (
    <div>
      {point && (
        <ChartRace
          data={data}
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
