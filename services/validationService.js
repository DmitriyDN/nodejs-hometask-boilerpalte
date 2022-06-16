class ValidationService {
    isString(value, minLength = 1, maxLength){
        if(typeof value === 'string'){
            if(minLength && value.trim().length < minLength){
                return false
            }
            if(maxLength && value.trim().length > maxLength){
                return false
            }
            return true
        }
        return false
    }
    isNumber(value, min, max){
        if(typeof value === 'number'){
            if((min || min !== 0) && value < min){
                return false
            }
            if((max || max !== 0) && value > max){
                return false
            }
            return true
        }

        return false
    }
    isObject(value){
        if(typeof value === 'object'){
            return true
        }
        return false
    }
    isArray(value){
        if(typeof value === 'array'){
            return true
        }
        return false
    }
    isEmail(value){
        if(this.isString(value) && value.slice(-10) === '@gmail.com'){
            return true
        }
        return false
    }
    isPhoneNumber(value){
        if(this.isString(value)){
            const check = value.match(/\+380[0-9]{9}/);
            if(check && value === check[0]){
                return true
            }
        }
        return false
    }
}

module.exports = new ValidationService();