global.Log = function(text){
    console.log(`[LOG] >> ${text}`)
}

global.Warn = function(text){
    console.log(`[WARN] >> ${text}`)
}

global.Err = function(text){
    console.log(`[ERROR] >> ${text}`)
}

global.Fatal = function(text){
    console.log(`[FATAL] >> ${text}`)
    process.exit(-1)
}
