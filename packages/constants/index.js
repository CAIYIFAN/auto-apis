// 保留关键字
const keywords = ["abstract", "arguments", "boolean", "break", "byte",
"case", "catch", "char", "class*", "const",
"continue", "debugger", "default", "delete", "do",
"double", "else", "enum*", "eval", "export*",
"extends*", "false", "final", "finally", "float",
"for", "function", "goto", "if", "implements",
"import*", "in", "instanceof", "int", "interface",
"let", "long", "native", "new", "null",
"package", "private", "protected", "public", "return",
"short", "static", "super*", "switch", "synchronized",
"this", "throw", "throws", "transient", "true",
"try", "typeof", "var", "void", "volatile",
"while", "with", "yield", "Array", "Date",
"eval", "function", "hasOwnProperty", "Infinite", "isNaN",
"isFinite", "isPrototypeOf", "length", "Math", "NaN",
"name", "Number", "Object", "prototype", "String",
"toString", "undefined", "valueOf", "alert", "all",
"anchor", "area", "assign", "blur", "button",
"checkbox", "clearInterval", "clearTimeout", "clientInformation", "close",
"closed", "confirm", "constructor", "crypto", "decodeURI",
"decodeURIComponent", "defaultStatus", "document", "element", "elements",
"embed", "embeds", "encodeURI", "encodeURIComponent", "escape",
"event", "fileUpload", "focus", "form", "forms",
"frame", "innerHeight", "innerWidth", "layer", "layers",
"link", "location", "mimeTypes", "navigate", "navigator",
"frames", "frameRate", "hidden", "history", "image",
"images", "offscreenBuffering", "open", "opener", "option",
"outerHeight", "outerWidth", "packages", "pageXOffset", "pageYOffset",
"parent", "parseFloat", "parseInt", "password", "pkcs11",
"plugin", "prompt", "propertyIsEnum", "radio", "reset",
"screenX", "screenY", "scroll", "secure", "select",
"self", "setInterval", "setTimeout", "status", "submit",
"taint", "text", "textarea", "top", "unescape",
"untaint", "window", "onblur", "onclick", "onerror",
"onfocus", "onkeydown", "onkeypress", "onkeyup", "onmouseover",
"onload", "onmouseup", "onmousedown", "onsubmit",
]

const fixedPath = '../..'

module.exports = {
  keywords,
  fixedPath
}