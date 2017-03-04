/**/
function isObject(obj){
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase() === 'object'
}
// https://github.com/redux-saga/redux-saga/issues/171#issuecomment-272438944
/**
 * @param {(generator|generator[])}
 */
function* combine(sagas){
    var arr = []

    if(!Array.isArray(sagas)){
        return yield saga=>saga()
    }

    sagas.forEach(saga=>{
        if(Array.isArray(saga)){
            saga.forEach(item=>arr.push(item))
        }else if(isObject(saga)){
            Object.keys(saga).forEach(key=>arr.push(saga[key]))
        }else{
            arr.push(saga)
        }
    })

    yield arr.map(saga=>saga())
}

/**
 * @param {...generators}
 */
function* apply(...sagas){
    yield Array.isArray(sagas)
        ? sagas.map(saga=>combine(saga))
        : [combine(sagas)]
}

/**
 * @param {...generators}
 */
export function combineSagas(...sagas){
    return function*(){
        yield apply(...sagas)
    }
}