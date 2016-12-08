import * as assert from 'power-assert'
import { SequenceOperation } from '../../src/operations/sequence-operation'
import { AddOperation } from '../../src/operations/add-operation'

describe('SequenceOperation', () => {
  it('applies operations processing left to right of text', () => {
    const op = new SequenceOperation([
      new AddOperation(2, '*1st*'),
      new AddOperation(3, '*2nd*')
    ])

    const actual = op.apply('Test')
    assert(actual === 'Te*1st*s*2nd*t')
  })

  it('applies operations processing right to left of text', () => {
    const op = new SequenceOperation([
      new AddOperation(3, '*1st*'),
      new AddOperation(2, '*2nd*')
    ])

    const actual = op.apply('Test')
    assert(actual === 'Te*2nd*s*1st*t')
  })

  it('inverts whole operations', () => {
    const op = new SequenceOperation([
      new AddOperation(2, '*1st*'),
      new AddOperation(3, '*2nd*')
    ])
    const inverse = op.inverse()

    const actual = inverse.apply(op.apply('Test'))
    assert(actual === 'Test')
  })
})
