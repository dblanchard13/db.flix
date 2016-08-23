/* eslint-env mocha */

const { expect } = require('chai')
const React = require('react')
const Search = require('../js/Search')
const ShowCard = require('../js/ShowCard')
const { shallow, mount } = require('enzyme')
const { shows } = require('../public/data')
const { store, rootReducer } = require('../js/Store')

xdescribe('<Search />', () => {
  it('should render the brand', () => {
    const wrapper = shallow(<Search />)
    // for debugging the rendered test object
    // console.log(wrapper.debug())
    expect(wrapper.contains(<h1 className='brand'>sVideo</h1>)).to.be.true
  })

  it('should render as many shows as there are data for', () => {
    const wrapper = shallow(<Search />)
    expect(wrapper.find(ShowCard).length).to.equal(shows.length)
  })

  it('should filter the shows correctly given new state', () => {
    const wrapper = mount(<Search />)
    const input = wrapper.find('.search-input')
    input.node.value = 'house'
    input.simulate('change')

    expect(wrapper.state('searchTerm')).to.equal('house')
    expect(wrapper.find('.show-card').length).to.equal(2)
  })
})

describe('Store', () => {
  it('Should bootstrap', () => {
    const state = rootReducer(undefined, {type: '@@redux/INIT'})
    expect(state).to.deep.eq({ searchTerm: '' })
  })

  it('Should handle setSearchTerm action', () => {
    const state = rootReducer({ searchTerm: 'dare' }, { type: 'setSearchTerm', value: 'winner winner' })
    expect(state).to.deep.equal({ searchTerm: 'winner winner' })
  })
})
