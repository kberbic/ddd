#!/bin/bash
output="node_modules/swagger-ui-dist/swagger-ui*.js"
remove="node_modules/swagger-ui-dist/swagger-ui*.js--"
sed -i -- "s~"\"/oauth2-redirect.html\""~"\"/api-doc/oauth2-redirect.html\""~g" $output
rm -rf $remove
