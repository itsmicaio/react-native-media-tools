
# react-native-media-tools
It's a lib to facilitate the construction of a media player for react-native with react-native-video

## Getting started

Install [react-native-video](https://github.com/react-native-community/react-native-video)

`$ yarn add react-native-media-tools`

## Usage
```javascript
import MediaPlayer from 'react-native-media-tools';

const App = () => (
	<MediaPlayer
		source={your_amazing_media}
		width={'100%'}
    height={200}
	>
)
```