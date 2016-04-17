import reducer, { initialState } from 'redux/modules/Auth'

describe('(Redux) Auth', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
