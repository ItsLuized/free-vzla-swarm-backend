# Swarm CID

[![Dependency Status](https://david-dm.org/ethersphere/swarm-cid-js.svg?style=flat-square)](https://david-dm.org/ethersphere/swarm-cid-js)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fethersphere%swarm-cid-js.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fethersphere%swarm-cid-js?ref=badge_shield)
[![](https://img.shields.io/badge/made%20by-Swarm-blue.svg?style=flat-square)](https://swarm.ethereum.org/)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
![](https://img.shields.io/badge/npm-%3E%3D6.0.0-orange.svg?style=flat-square)
![](https://img.shields.io/badge/Node.js-%3E%3D12.0.0-orange.svg?style=flat-square)
![](https://img.shields.io/badge/runs%20in-browser%20%7C%20node%20%7C%20webworker%20%7C%20electron-orange)

> Utility library to convert Swarm hex references into Swarm CIDs and vice versa.

**Warning: This project is in alpha state. There might (and most probably will) be changes in the future to its API and working. Also, no guarantees can be made about its stability, efficiency, and security at this stage.**

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contribute](#contribute)
- [License](#license)

## Install

```sh
> npm install @ethersphere/swarm-cid-js --save
```

## Usage

```ts
import * as swarmCid from '@ethersphere/swarm-cid-js'

const someReference = 'ca6357a08e317d15ec560fef34e4c45f8f19f01c372aa70f1da72bfa7f1a4338'

const manifestCid = swarmCid.encodeReference(someReference, swarmCid.ReferenceType.MANIFEST)
// OR: swarmCid.encodeManifestReference(someReference)

console.log(manifestCid.toString())
// Prints base32 encoded CID string: bah5acgzazjrvpieogf6rl3cwb7xtjzgel6hrt4a4g4vkody5u4v7u7y2im4a

swarmCid.decodeFeedCid(manifestCid) // This will throw Error as it expects Manifest CID
console.log(swarmCid.decodeCid(manifestCid))
// Prints:
// {
//   type: 'manifest'
//   reference: 'ca6357a08e317d15ec560fef34e4c45f8f19f01c372aa70f1da72bfa7f1a4338'
// }
```

## API

There are generic functions, that encode/decode which does not throw when unexpected codec.

 - `decodeCid`
 - `encodeReference`

And there are type-related functions that check for correct codecs:

 - `encodeFeedReference` / `decodeFeedCid`
 - `encodeManifestReference` / `decodeManifestCid`

Encoding operations returns `CID` class! So if you want base32 encoded string then you have to call `cid.toString()`

## Contribute

There are some ways you can make this module better:

- Consult our [open issues](https://github.com/ethersphere/swarm-cid-js/issues) and take on one of them
- Help our tests reach 100% coverage!
- Join us in our [Discord chat](https://discord.gg/wdghaQsGq5) in the #develop-on-swarm channel if you have questions or want to give feedback

## Maintainers

- [auhau](https://github.com/auhau)
- [vojtechsimetka](https://github.com/vojtechsimetka)

## License

[BSD-3-Clause](./LICENSE)


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fethersphere%swarm-cid-js.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fethersphere%swarm-cid-js?ref=badge_large)
