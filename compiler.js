const util = require('util')
const {VM} = require('vm2')

module.exports = {
    compileString(str, sandbox) {    
        const vm = new VM({sandbox})
        return vm.run(str)
    }
}