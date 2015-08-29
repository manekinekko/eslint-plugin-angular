/**
 * @ruleName json-functions
 * @description
 *
 * You should use angular.fromJson or angular.toJson instead of JSON.parse and JSON.stringify
 */
module.exports = function(context) {

    'use strict';

    return {

        'MemberExpression': function(node) {
            if(node.object.name === 'JSON'){
                if(node.property.name === 'stringify'){
                    context.report(node, 'You should use the toJson method instead of JSON.stringify', {});
                } else if(node.property.name === 'parse'){
                    context.report(node, 'You should use the fromJson method instead of JSON.parse', {});
                }
            }
        }
    };

};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
