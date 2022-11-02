/* ============
  ONCLICK A-Frame Component

  (c) Copyright 2020 Warwick Molloy
  Distributed under the MIT License

  Enables declaration in A-Frame Entity to have a 'click' event handler
  that can be a local function that takes the element bound to `this` variable
  and take zero or more arguments.

  Example Usage:
    <script>
      function whenClicked(color) {
        let element = this
        element.setAttribute('material', `color: ${color}`)
      }
    </script>

    <a-entity geometry="primitive: box" onclick="whenClicked('red')"></a-entity>
 ============== */

console.log("onclick by Warwick Molloy... loaded")

const COMPONENT = "onclick"

function argsToArray(args) {
    let argsList = args.replace(/'/g,'"')
    let asJson = `{"args": [${argsList}]}`
    let objWithArry = JSON.parse(asJson)
    return objWithArry['args']
}

function funcWrapperArgs(matchResult, component) {
    let funcName = matchResult[1]
    let args = argsToArray( matchResult[2] )
    let func = window[funcName].bind(component)
    return function() {
        func(args)
    }
}

function funcWrapperNoArgs(funcName, component) {
    let func = window[funcName].bind(component)
    return function() {
        func()
    }
}

/*
 * Creates a function from the string specified in the component value.
 */
function proxyFunctionCodeGenerator(functionWithOptParamList, component) {
    let matchResult = functionWithOptParamList.match(/^(.*)\((.*)\).*$/)
    let proxyFunc

    if (matchResult) {
        proxyFunc = funcWrapperArgs(matchResult, component)
    } else {
        proxyFunc = funcWrapperNoArgs(functionWithOptParamList, component)
    }
    return proxyFunc
}

AFRAME.registerComponent(COMPONENT, {
    schema: {
        type: 'string',
        default: ''
    },
    init: function() {
        this.handler = null
    },
    update: function () {
        this.handler = proxyFunctionCodeGenerator(this.data, this.el)
    },
    events: {
        click: function () {
            if (this.handler) {
                this.handler()
            }
        }
    }
})