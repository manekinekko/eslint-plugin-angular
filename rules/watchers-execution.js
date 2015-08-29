/**
 * @ruleName watchers-execution
 * @description
 *
 * For the execution of the watchers, the $digest method will start from the scope in which we call the method.
 * This will cause an performance improvement comparing to the $apply method, who start from the $rootScope
 */
module.exports = function(context) {

    'use strict';

    var methods = ['$apply', '$digest'];
    return {

        'MemberExpression': function(node) {
            var method = context.options[0];
            var forbiddenMethod = methods.filter(function(m){ return m !== method; });
            if(forbiddenMethod.length > 0 && node.property.type === 'Identifier' && forbiddenMethod.indexOf(node.property.name) >= 0){
                context.report(node, 'Instead of using the {{forbidden}}() method, you should prefer {{method}}()', {
                    forbidden: node.property.name,
                    method: method
                });
            }
        }
    };

};

module.exports.schema = [{
    type: 'string',
}];
