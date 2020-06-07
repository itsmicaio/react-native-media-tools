
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
    width={320}
    height={200}
  />
)
```

## Props
This lib supports almost all [react-native-video](https://github.com/react-native-community/react-native-video) props, because some are used internally by media players.\
Unsupported props: `controls, muted, paused`

### type
Defines what type of media player will be rendered. `Default: video`

Type | Description
--- | ---
video | Type default. It makes your life easier when creating a video player.
audio | Makes your life easier when creating an audio player


## Component Props
### errorScreenComponent
Allows you to replace the error screen. List of props received on component:
Property | Type | Description
--- | --- | ---
reload | function | Function to reload media.

Example of a valid component:
```javascript
export default ErrorScreen = ({reload}) => (
  <View>
    <Text>
      ERROR TRYING TO PLAY THE MEDIA
    </Text>
    <TouchableOpacity 
      onPress={reload}
    >
      <Text>
        Reload
      </Text>
    </TouchableOpacity>
  </View>
)
```

### initialPlayComponent 
Allows you to replace the home screen with the play button. List of props received on component:
Property | Type | Description
--- | --- | ---
togglePause | function | Function to toggle vídeo play or pause;

```javascript
export default InitialPlay = ({togglePause}) => (
  <View>
    <TouchableOpacity 
      onPress={togglePause}
    >
      <Text>
        Play
      </Text>
    </TouchableOpacity>
  </View>
)
```

### loadingComponent 
Allows you to replace the loading screen. This component does not receive any props.

```javascript
export default Loading = () => (
  <View>
    <ActivityIndicator size='large'/>
  </View>
)
```

### controlBarComponent
Allows you to replace the control bar of media player. List of props received on component:

Property | Type | Description
--- | --- | ---
togglePause | function | Function to toggle vídeo play or pause
toggleMute | function | Function to toggle audio mute
reload | function | Function to reload media.
paused | bool | True: paused / False: played 
muted | bool | True: muted
currentTimeFormatted | text | Time formatted in HH:mm:ss
currentTime | float | Current media time in seconds
duration | float | Media duration time in seconds
toggleFullscreen | function | Function to toggle fullscreen mode
fulscreen | bool | True: player in fullscreen / false: normal mode


```javascript
export default ControlBar = ({
  togglePause, 
  toggleMute, 
  reload, 
  paused, 
  muted, 
  currentTimeFormatted
}) => (
  <View>
    <TouchableOpacity
      onPress={togglePause}
    >
      <Text style={styles.icon}>
        {paused ? 'play' : 'pause'}
      </Text>
    </TouchableOpacity>
    <Text>
      {currentTimeFormatted}
    </Text>
    <TouchableOpacity
      onPress={toggleFullScreen}
    >
      {fullscreen ? 'exit_fullscreen' : 'enter_fullscreen'}
    </TouchableOpacity>
  </View>
)