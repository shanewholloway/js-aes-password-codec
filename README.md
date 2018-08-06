# AES GCM Password Codec

An Isomorphic PBKDF2 + AES-GCM password codec implementation for NodeJS and the Browser.


Browser:
```html
<script src='https://unpkg.com/aesgcm_password_codec/umd/aesgcm_password_codec.min.js'></script>
```

NodeJS:
```bash
$ npm i aesgcm_password_codec
```

## Quick Start

```javascript
const aesgcm_password_codec = require('aesgcm_password_codec')

async function demo() {
  const aes_codec = await aesgcm_password_codec(
    'secret password', { salt: '+t07slf9nBY9Z5PPynvF2g==' })

  console.log(aes_codec.options)
  /* --> { pbkdf2: { hash: 'SHA-256', salt: '+t07slf9nBY9Z5PPynvF2g==',
                     iterations: 100000, keylen: 16 },
           cipher: { alg: 'AES-GCM', length: 128, tagLength: 128 },
           extractable: [Getter] }
  */

  const obj = {hello: 'friendly npm or github user!'}

  const enc_rec_b64 = await aes_codec.encrypt_json(obj)
  console.log(enc_rec_b64)
  // --> "r7Qhl9WrXexsr61Y DQ7wroDmek8xyutVMyRHGi1LZkWCibZuvT1+WZEGqFvIZudo5uUHF5KXKRscv1HSGoVD/eOa/oE="

  const rt_obj = await aes_codec.decrypt_json(enc_rec_b64)
  console.log(rt_obj)
  // --> {hello: 'friendly npm or github user!'}

  const rt_stored = await aes_codec.decrypt_json(
    "tODalsnEZXa5ai9D aPa9IQUSdWhrAiL18a0j/rgPuK084ebdnwOo/uzckc3qfIr4qxoaAYIQNVwcAty+GCgI4L2jnQ==")
  console.log(rt_stored)
  // --> {hello: 'hello from the Mocha tests!'}
}
```

## Related

Project built with [JSY-lang](https://jsy-lang.github.io).

## License

[MIT](LICENSE)
