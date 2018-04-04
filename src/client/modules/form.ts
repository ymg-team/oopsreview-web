export class validation {
  // solved from : https://www.typescriptlang.org/docs/handbook/classes.html
  rules: {[n: string]: any}
  constructor(rules: Object) {
    this.rules = rules
  }

  validate (formdata: {[n: string]: any}) {
    let isValid: Boolean = true
    let result: {[n: string]: any} = {}

    Object.keys(this.rules).map((n, key) => {
      const rules = this.rules[n].split('|')
      if (rules.includes('required') && !formdata[n]) {
        isValid = isValid && false
        result[n] = {
          isValid: false,
          message: 'this input is required'
        }
      } else {
        isValid = isValid && true
        result[n] = {
          isValid: true,
          message: ''
        }
      }
    })

    return {
      isValid,
      result
    }
  }
}

