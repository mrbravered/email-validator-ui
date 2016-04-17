import reducer, { initialState } from 'redux/modules/SingleValidation'

describe('(Redux) SingleValidation', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
