import * as assert from 'power-assert'
import { Buffer } from '../src/buffer'

describe('Buffer', () => {
  let buffer
  beforeEach(() => {
    buffer = new Buffer()
  })

  it('successfully undoes separated undos', () => {
    buffer.addText(0, 'foobaz')
    buffer.addText(3, 'bar')
    buffer.undo(1)
    buffer.undo(0)

    assert(buffer.text === '')
  })
})
