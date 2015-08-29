/**
 * @ruleName function-type
 * @description
 *
 * Anonymous or named functions inside AngularJS components.
 * The first parameter sets which type of function is required and can be 'named' or 'anonymous'.
 * The second parameter is an optional list of angular object names.
 * [Y024](https://github.com/johnpapa/angular-styleguide/blob/master/README.md#style-y024)
 */
module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils'),
        angularObjectList = ['controller', 'filter', 'factory', 'service'],
        configType = context.options[0],
        message;

    function isArray(item){
        return Object.prototype.toString.call(item) === '[object Array]';
    }

    if(isArray(context.options[1])){
        angularObjectList = context.options[1];
    }

    if(configType === 'anonymous'){
        message = 'Use anonymous functions instead of named function';
    }

    else if(configType === 'named'){
        message = 'Use named functions instead of anonymous function';
    }

    function checkType(arg){
        return (configType === 'named' && utils.isIdentifierType(arg)) ||
            (configType === 'anonymous' && utils.isFunctionType(arg));
    }

    return {

        'CallExpression': function(node) {

            var callee = node.callee,
                angularObjectName = callee.property && callee.property.name,
                firstArgument = node.arguments[1];

            if(utils.isAngularComponent(node) && callee.type === 'MemberExpression' && angularObjectList.indexOf(angularObjectName) >= 0){

                if(checkType(firstArgument)){
                    return;
                }

                else if(utils.isArrayType(firstArgument)){
                    var last = firstArgument.elements[firstArgument.elements.length - 1];
                    if(checkType(last)){
                        return;
                    }
                }

                context.report(node, message, {});
            }
        }
    };
};

module.exports.schema = [{
    type: 'string'
}, {
    type: 'array'
}];
