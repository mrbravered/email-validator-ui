import reducer, { initialState } from 'redux/modules/BulkValidation'

describe('(Redux) BulkValidation', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
