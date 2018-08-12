import toast from "../modules/toast"

export class validation {
  // solved from : https://www.typescriptlang.org/docs/handbook/classes.html
  rules: {[n: string]: any}
  constructor(rules: Object) {
    this.rules = rules
  }

  validate (formdata: {[n: string]: any}) {
    let is_valid: Boolean = true
    let result: {[n: string]: any} = {}

    Object.keys(this.rules).map((n, key) => {
      const rules = this.rules[n].split('|')
      if (rules.includes('required') && !formdata[n]) {
        is_valid = is_valid && false
        result[n] = {
          is_valid: false,
          message: 'this input is required'
        }
      } else {
        is_valid = is_valid && true
        result[n] = {
          is_valid: true,
          message: ''
        }
      }
    })

    if(!is_valid) toast('form belum valid', 'error')

    return {
      is_valid,
      result
    }
  }
}

