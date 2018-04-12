var index = require("../models/index.js");
var chai = require("chai");
var expect = chai.expect;
var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

describe("index", function() {
  it("to have db not to be null", function() {
    expect(index.db).to.not.equal(null);
  });
});
