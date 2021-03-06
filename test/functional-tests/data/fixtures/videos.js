const range = require('lodash.range')
const { ID, TITLE, IPFS_HASH } = require('../../constants/VideoTestConstants')

const SCIENCE_VIDEO = {
  _id: 'QmNZS5J3LS1tMEVEP3tz3jyd2LXUEjkYJHyWSuwUvHDaRJ',
  title: 'The scientist who cracked Wall Street | Jim Simons',
  description:
    "Jim Simons was a scientist and cryptographer who realized: the complex science he used to break codes could help explain patterns in the world of finance. Billions later, he’s working to support the next generation of science teachers and scholars. TED’s Chris Anderson sits down with Simons to talk about his extraordinary life in numbers.\n\nTEDTalks is a daily video podcast of the best talks and performances from the TED Conference, where the world'sleading thinkers and doers give the talk of their lives in 18 minutes (or less). Look for talks on Technology, Entertainment and Design -- plus science, business, global issues, the arts and much more.\nFind closed captions and translated subtitles in many languages at http://www.ted.com/translate\n\nFollow TED news on Twitter: http://www.twitter.com/tednews\nLike TED on Facebook: https://www.facebook.com/TED\n\nSubscribe to our channel: http://www.youtube.com/user/TEDtalksD...",
  duration: '23:19',
  price: 14,
  ipfsHash: 'hash1',
  thumbnails: ['thumbnail-1280x720_2.png'],
  owner: '0x9e2d04eef5b16CFfB4328Ddd027B55736407B275',
  author: 'scienceGenius2k18',
  staked: true
}

const SCIENCE_VIDEO_MISSING_THUMBNAIL = {
  _id: 'QmzzNZS5J3LS1tMEVEP3tz3jyd2LXUEjkYJHyWSuwUvHDaRJZZ',
  title: 'I like science',
  description: 'Here are some science',
  duration: '04:11',
  price: 0,
  ipfsHash: 'hash1222',
  thumbnails: [],
  owner: '0x9e23d04eef5b16CFfB4328Ddd027B55736407B275',
  author: 'scienceDood6',
  staked: true
}

const DEVCON_VIDEO = {
  _id: 'QmNhyQjsFW2Tvuz7CFwDTBPo3dfBQ3S4StEpfUZPSpK9FY',
  title: 'Devcon2: Ethereum in 25 Minutes',
  description:
    'Presentation Slides Download: https://ethereumfoundation.org/devcon...\n\nDevcon2: Ethereum in 25 Minutes. Ethereum Foundation Chief Scientist, Vitalik Buterin, describes Ethereum.\nSpeakers: Vitalik Buterin\n\nEthereum Developer Conference, 2016 September 19 - 21,\nShanghai, China (and math!)',
  duration: '11:11',
  price: 0,
  ipfsHash: 'hash2',
  thumbnails: ['thumbnail-1280x720_3.png', 'foo.png'],
  owner: '0x9e2d04eef5b16CFfB4328Ddd027B55736407B275',
  author: 'cryptohacker',
  staked: true
}

const ETHEREUM_VIDEO = {
  _id: 'QmPDG5AxEpfsQ1cfWU6Kcguc9Bn6eDEdKiUbqxUwSRQBi7',
  title: 'Ethereum: On blockchain interop and scaling',
  description:
    'Vlad Zamfir and Vitalik Buterin present their latest research on blockchain interoperability and scaling as part of DEVCON 0.',
  duration: '05:39',
  price: 0,
  ipfsHash: 'hashETH',
  thumbnails: ['thumb.png', 'bar.png'],
  owner: '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
  author: 'eth_dude',
  staked: true
}

const buildSportsVideo = (seed = 1) => ({
  _id: `QmPDG5AxEpfsQ1cfWU6Kcguc9Bn6eDEdKiUbqxUwSRQBi7_${seed}`,
  title: `Sports ${seed}`,
  description: `These guys like sports ${seed}`,
  duration: '11:11',
  price: 0,
  ipfsHash: `hashFoobaz${seed}`,
  thumbnails: [`thumb_${seed}.png`, `bar_${seed}.png`],
  owner: `0xe19678107410951a9ed1f6906ba4c913eb0e44d${seed}`,
  author: `sports_${seed}`,
  staked: true
})

const BUNNY_VIDEO = {
  _id: ID,
  owner: '0xe19678107410951a9ed1f6906ba4c913eb0e44d4',
  title: TITLE,
  ipfsHash: IPFS_HASH
}

module.exports = [
  SCIENCE_VIDEO,
  SCIENCE_VIDEO_MISSING_THUMBNAIL,
  DEVCON_VIDEO,
  ETHEREUM_VIDEO,
  ...range(1, 15).map(buildSportsVideo),
  BUNNY_VIDEO
]
