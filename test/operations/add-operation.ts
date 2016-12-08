import * as assert from 'power-assert'
import { AddOperation } from '../../src/operations/add-operation'
import { RemoveOperation } from '../../src/operations/remove-operation'

describe('AddOperation', () => {
  let op
  beforeEach(() => {
    op = new AddOperation(2, '*inserted*')
  })

  it('applies the operation to given string', () => {
    const actual = op.apply('test')
    const expected = 'te*inserted*st'
    assert(actual === expected)
  })

  it('gives remove operation by inverse method', () => {
    const inverse = op.inverse()
    assert(inverse.type === 'remove')
    assert(inverse.index === 2)
    assert(inverse.length === 10)
  })

  describe('Transform methods', () => {
    it('increase the index of the operation if the opposed add-operation inserts before original\'s index', () => {
      const opposed = new AddOperation(1, '-opposed-')
      const transformed = op.transform(opposed)

      const actual = transformed.apply(opposed.apply('test'))

      assert(actual === 't-opposed-e*inserted*st')
    })

    it('does not transform if the index of opposed add-operation is equal or greater than original operation', () => {
      const opposed = new AddOperation(2, '-opposed-')
      const transformed = op.transform(opposed)

      const actual = transformed.apply(opposed.apply('test'))

      assert(actual === 'te*inserted*-opposed-st')
    })

    it('inserts after removed position if the position is before added position', () => {
      const opposed = new RemoveOperation(1, 1)
      const transformed = op.transform(opposed)

      const actual = transformed.apply(opposed.apply('test'))

      assert(actual === 't*inserted*st')
    })

    it('inserts correct position even if a remove-operation removes across the added position', () => {
      const opposed = new RemoveOperation(1, 3)
      const transformed = op.transform(opposed)

      const actual = transformed.apply(opposed.apply('test'))

      assert(actual === 't*inserted*')
    })

    it('does not transform if the index of opposed remove-operation is equal or greater than original operation', () => {
      const opposed = new RemoveOperation(2, 1)
      const transformed = op.transform(opposed)

      const actual = transformed.apply(opposed.apply('test'))

      assert(actual === 'te*inserted*t')
    })
  })
})
