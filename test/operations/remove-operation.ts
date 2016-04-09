import * as assert from 'power-assert';
import { AddOperation } from '../../src/operations/add-operation';
import { RemoveOperation } from '../../src/operations/remove-operation';

describe('RemoveOperation', () => {
  let op;
  beforeEach(() => {
    op = new RemoveOperation(1, 5);
  });

  it('applies the operation to given string', () => {
    const actual = op.apply('testtest');
    const expected = 'tst';
    assert(actual === expected);
  });

  it('gives remove operation by inverse method', () => {
    op.apply('testtest');
    const inverse = op.inverse();
    const actual = inverse.apply('tst');

    assert(actual === 'testtest');
  });

  describe('Transform methods', () => {
    it('increase the removing position if the opposed add-operation\'index is less than the original operation', () => {
      const opposed = new AddOperation(1, '*ins*');
      const trans = op.transform(opposed);
      const actual = trans.apply(opposed.apply('testtest'));

      assert(actual === 't*ins*st');
    });

    it('does not transform if the opposed add-operation\'s index is greater than the original operation', () => {
      const opposed = new AddOperation(6, '*ins*');
      const trans = op.transform(opposed);
      const actual = trans.apply(opposed.apply('testtest'));

      assert(actual === 't*ins*st');
    });

    it('does not remove the text inserted by the opposed add-operation', () => {
      const opposed = new AddOperation(2, '*ins*');
      const trans = op.transform(opposed);
      const actual = trans.apply(opposed.apply('testtest'));

      assert(actual === 't*ins*st');
    });

    it('does not remove the text inserted by the opposed add-operation', () => {
      const opposed = new AddOperation(4, '*ins*');
      const trans = op.transform(opposed);
      const actual = trans.apply(opposed.apply('testtest'));

      assert(actual === 't*ins*st');
    });

    it('does not transform if the opposed operation will be applied at greater than the original operation', () => {
      const opposed = new RemoveOperation(6, 2);
      const trans = op.transform(opposed);
      const actual = trans.apply(opposed.apply('testtest'));

      assert(actual === 't');
    });

    it('decrease the position if the opposed operation will be applied before the original operation', () => {
      const opposed = new RemoveOperation(0, 1);
      const trans = op.transform(opposed);
      const actual = trans.apply(opposed.apply('testtest'));

      assert(actual === 'st');
    });

    it('transforms if the opposed operation intersects the start position of the original operation', () => {
      const opposed = new RemoveOperation(0, 3);
      const trans = op.transform(opposed);
      const actual = trans.apply(opposed.apply('testtest'));

      assert(actual === 'st');
    });

    it('transforms if the opposed operation intersects the end position of the original operation', () => {
      const opposed = new RemoveOperation(4, 3);
      const trans = op.transform(opposed);
      const actual = trans.apply(opposed.apply('testtest'));

      assert(actual === 'tt');
    });

    it('transforms if the opposed operation in the removing text of original operation', () => {
      const opposed = new RemoveOperation(2, 4);
      const trans = op.transform(opposed);
      const actual = trans.apply(opposed.apply('testtest'));

      assert(actual === 'tst');
    });

    it('transformed to noop if the opposed operation covers the original operation', () => {
      const opposed = new RemoveOperation(1, 6);
      const trans = op.transform(opposed);
      const actual = trans.apply(opposed.apply('testtest'));

      assert(actual === 'tt');
    });
  });
});
