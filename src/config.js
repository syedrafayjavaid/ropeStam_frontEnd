import React from 'react'
let env = 'local';

let config = {
    prod: {
        base_url: ''
    },
    local: {
        base_url: 'http://localhost:5000'
    },

}

if (env === 'prod') {
    config = config.prod

}

else if (env === 'local') {
    config = config.local
}

export default config;







