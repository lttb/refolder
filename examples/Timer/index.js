import React, {useState, useEffect} from 'react'
import {timer} from 'rxjs'
import {map} from 'rxjs/operators'

import fold from '../../src'
import {observe} from '../../src/react'

const timer$ = timer(0, 1000)

export const enhance = fold(observe(timer$.pipe(map(time => ({time})))))

const Timer = ({time}) => <div>The timer is: {time}</div>

export default enhance(Timer)
