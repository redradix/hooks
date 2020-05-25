import { bindActionCreators } from 'redux'
import { path, mapObjIndexed } from 'ramda'
import { useSelector, useDispatch } from 'react-redux'

const useContext = (selectors, actions = {}) => {
  const dispatch = useDispatch()
  const props = {
    ...mapObjIndexed(prop => useSelector(path(prop)), selectors),
    ...bindActionCreators(actions, dispatch),
  }
  return props
}

export default useContext