/**
 * @ruleName typecheck-date
 * @description
 *
 * You should use the angular.isDate method instead of the default JavaScript implementation (typeof new Date() === "[object Date]").
 */
module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    function recordError(node, origin){
        if(node.type === 'Literal' && node.value === '[object Date]') {
            context.report(origin, 'You should use the angular.isDate method', {});
        }
    }

    return {

        'BinaryExpression': function(node) {

            if(node.operator === '===' || node.operator === '!=='){
                if(utils.isTypeOfStatement(node.left) || utils.isToStringStatement(node.left)){
                    recordError(node.right, node);
                }
                else if(utils.isTypeOfStatement(node.right) || utils.isToStringStatement(node.right)){
                    recordError(node.left, node);
                }
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
