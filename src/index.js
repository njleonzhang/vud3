// Container
import Surface from './container/Surface'
import Layer from './container/Layer'

// shape
import Line from './shape/Line'
import Area from './shape/Area'

let components = [
  Surface,
  Layer,
  Line,
  Area
]

let install = function (Vue) {
  components.forEach(c => {
    Vue.component(c.name, c)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
  console.log('vud3 installed succesfully!')
} else {
  console.warn('you must use vue')
}

export {
  Surface,
  Layer,
  Line,
  Area
}