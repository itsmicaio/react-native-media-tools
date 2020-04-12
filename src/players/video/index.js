import React, {Component} from 'react'
import {
	View, 
    StyleSheet,
} from 'react-native'

import ErrorBox from './Error'
import PlayButton from './PlayButton'
import ControlBar from './ControlBar'
import ButtonFrame from './ButtonFrame'
import Loading from './Loading'

import Video from 'react-native-video'
import { colors } from '../../commons';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000'
    },
    box: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    liveText: {
        color: colors.blue,
        fontWeight: 'bold',
        fontSize: 13,
        marginRight: 12
    },
});

export default class Stream extends Component {
    state = {
        source: this.props.source,
        loadError: false,
        loading: false,
        currentTime: 0,
        currentTimeFormatted: '00:00',
        loadingUp: '',
        showControls: true,
        paused: true,
        muted: false,
    }

    onBuffer = (event) => {
        this.setState({loading: event.isBuffering})
    }

    onLoad = (event) => {
        this.setState({loading: false})
    }
    onError = (event) => {
        this.setState({
            loading: false,
            showControls: false,
            loadError: true,
        })
    }

    onLoadStart = (event) => {
        this.setState({loading: true})
    }

    onReadyForDisplay = (event) => {
        this.setState({loading: false})
    }

    onProgress = (event) => {
        const {currentTime} = event
        if (currentTime != this.state.currentTime)
            this.setState({
                currentTime,
                currentTimeFormatted: this.formatTime(currentTime),
                loading: false,
            })
        else {
            this.onProgressLoading()
        }
    }

    formatTime = (currentTime) => {
        const formatter = function(num, size) { return ('000' + num).slice(size * -1); },
        time = parseFloat(currentTime).toFixed(3),
        hours = Math.floor(time / 60 / 60),
        minutes = Math.floor(time / 60) % 60,
        seconds = Math.floor(time - minutes * 60)

        const hoursFormatted = formatter(hours, 2) != '00' ? formatter(hours, 2) + ':' : ''
        return `${hoursFormatted}${formatter(minutes, 2)}:${formatter(seconds, 2)}`
    }

    onProgressLoading = () => {
        const {loadingUp, loading} = this.state

        if (loading && loadingUp != "" && loadingUp < Date.now()){
            this.setState({
                loading: false,
                loadingUp: '',
                loadError: true,
            })
        }else if (!loading){
            this.setState({
                loading: true,
                loadingUp: Date.now() + 15000
            })
        }
    }

    reload = () => {
        this.setState({
            source: '',
            loadError: false,
        })

        setInterval(
            () => 
                this.setState({
                    source: this.props.source
                }
        ), 100)
    }

    togglePause = () => {
        this.setState({paused: !this.state.paused})
    }

    render() {
        const {
            source, 
            paused, 
            showControls, 
            loading,
            loadError,
            muted,
            currentTimeFormatted
        } = this.state

        const {
            orientation,
            width,
            height
        } = this.props

        const size = {
            width: width,
            height: orientation === 'portrait' ? (width * 0.5625) : height
        }

        const renderVideo = source ? 
            <Video 
                ref={(ref) => {
                    this.player = ref
                }}
                source={source}
                onBuffer={this.onBuffer}
                onLoad={this.onLoad}
                onError={this.onError}
                onLoadStart={this.onLoadStart}
                onReadyForDisplay={this.onReadyForDisplay}
                onProgress={this.onProgress}
                muted={muted}
                paused={paused}
                style={size}
                playInBackground={true}
                minLoadRetryCount={5}
                resizeMode={'contain'}
                bufferConfig={{
                    minBufferMs: 15000,
                    maxBufferMs: 50000,
                    bufferForPlaybackMs: 2500,
                    bufferForPlaybackAfterRebufferMs: 5000
                }}
            /> 
            : null

        const renderError = 
            <ErrorBox
                style={styles.box}
                reload={this.reload}
            />

        const renderLoading = loading &&
            <Loading
                style={styles.box}
            />

        const renderCenterPlayButton = !loading && paused &&
            <PlayButton
                style={styles.box}
                togglePause={this.togglePause}
            />

        const renderControlBar = showControls &&
            <ControlBar 
                togglePause={this.togglePause}
                paused={paused}
                muted={muted}
                toggleMute={() => this.setState({muted: !muted})}
                reload={this.reload}
                currentTimeFormatted={currentTimeFormatted}
                orientation={orientation}
            />

        const renderToggleControlsFrame = !loading && !paused && 
            <ButtonFrame 
                style={styles.box}
                onPress={() => this.setState({showControls: !showControls})}
            />


        const render = loadError ?
                renderError
            :
            <>
                {renderVideo}
                {renderCenterPlayButton}
                {renderLoading}
                {renderToggleControlsFrame}
                {renderControlBar}
            </>

        return (
            <View
                style={[styles.container, size]}
            >
                {render}
            </View>
        )
    }
}