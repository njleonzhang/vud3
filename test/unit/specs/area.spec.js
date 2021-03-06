import VArea from 'src/shape/Area'
import { destroyVM, createVue } from '../utils'
import { area, curveCatmullRom, curveMonotoneX } from 'd3-shape'

describe('area', () => {
  let vm
  let data = [{x: 0, y: 2}, {x: 20, y: 10}, {x: 50, y: 40}]

  afterEach(() => {
    vm.$destroy()
    destroyVM(vm)
  })

  it('can accept x, y1', () => {
    vm = createVue({
      components: {
        VArea
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-area
                x={p => p.x}
                y1={p => p.y}
                data={data}/>
            </svg>
          </div>
        )
      }
    })
    expect(vm.$el.querySelector('path').getAttribute('d'))
      .to.equal(area().x(p => p.x).y1(p => p.y)(data))
  })

  it('can accept x, y0, y1', () => {
    vm = createVue({
      components: {
        VArea
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-area
                x={p => p.x}
                y1={p => p.y}
                y0={p => p.y * 2}
                data={data}/>
            </svg>
          </div>
        )
      }
    })
    expect(vm.$el.querySelector('path').getAttribute('d'))
      .to.equal(area().x(p => p.x).y0(p => p.y * 2).y1(p => p.y)(data))
  })

  it('can accept y, x0, x1', () => {
    vm = createVue({
      components: {
        VArea
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-area
                x0={p => 0}
                x1={p => p.x}
                y={p => p.y}
                data={data}/>
            </svg>
          </div>
        )
      }
    })
    expect(vm.$el.querySelector('path').getAttribute('d'))
      .to.equal(area().x0(p => 0).x1(p => p.x).y(p => p.y)(data))
  })

  it('can accept defined', () => {
    vm = createVue({
      components: {
        VArea
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-area
                x0={p => 0}
                x1={p => p.x}
                y={p => p.y}
                defined={p => p.y > 2}
                data={data}/>
            </svg>
          </div>
        )
      }
    })
    expect(vm.$el.querySelector('path').getAttribute('d'))
      .to.equal(area().x0(p => 0).x1(p => p.x).y(p => p.y).defined(p => p.y > 2)(data))
  })

  it('can accept other attribute', () => {
    vm = createVue({
      components: {
        VArea
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-area
                x0={p => 0}
                x1={p => p.x}
                y={p => p.y}
                fill="yellow"
                stroke="blue"
                data={data}/>
            </svg>
          </div>
        )
      }
    })

    let path = vm.$el.querySelector('path')
    expect(path.getAttribute('d'))
      .to.equal(area().x0(p => 0).x1(p => p.x).y(p => p.y)(data))
    expect(path.getAttribute('fill'))
      .to.equal('yellow')
    expect(path.getAttribute('stroke'))
      .to.equal('blue')
  })

  it('can curve name and optional curveArgs', () => {
    vm = createVue({
      components: {
        VArea
      },
      render (h) {
        return (
          <div>
            <svg>
              <v-area
                curve="catmullRom"
                curveArgs={{alpha: 3}}
                x0={p => 0}
                x1={p => p.x}
                y={p => p.y}
                data={data}/>
              <v-area
                curve="monotoneX"
                x0={p => 0}
                x1={p => p.x}
                y={p => p.y}
                data={data}/>
            </svg>
          </div>
        )
      }
    })

    expect(vm.$el.querySelectorAll('path')[0].getAttribute('d'))
      .to.equal(area().curve(curveCatmullRom.alpha(3)).y(p => p.y).x1(p => p.x).x0(p => 0)(data))
    expect(vm.$el.querySelectorAll('path')[1].getAttribute('d'))
      .to.equal(area().curve(curveMonotoneX).y(p => p.y).x1(p => p.x).x0(p => 0)(data))
  })
})
