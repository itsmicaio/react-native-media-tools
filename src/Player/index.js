import React, { PureComponent } from 'react'
import {
    View,
} from 'react-native'
import ControlBar from './ControlBar'
import ButtonFrame from './ButtonFrame'

import Video from 'react-native-video'
import { boxStyle } from 'react-native-media-tools/src/commons'

export default class Player extends PureComponent {
    state = {
        source: this.props.source,
        loadError: false,
        loading: false,
        loadingUp: '',
        showControls: true,
        currentTime: 0,
        duration: 0,
        paused: true,
        muted: false,
        countdown: false
    }

    componentDidUpdate = () => {
        this.state.showControls ? this.hideShowControls() : false
    }

    onBuffer = (event) => {
        this.setState({ loading: event.isBuffering })
    }

    onLoad = (event) => {
        const { duration } = event
        this.setState({ loading: false, duration })
    }
    onError = (event) => {
        this.setState({
            loading: false,
            showControls: false,
            loadError: true,
        })
    }

    onLoadStart = (event) => {
        this.setState({ loading: true })
    }

    onReadyForDisplay = (event) => {
        this.setState({ loading: false })
    }

    onProgress = (event) => {
        const { currentTime } = event
        if (currentTime != this.state.currentTime)
            this.setState({
                currentTime,
                loading: false,
            })
        else {
            this.onProgressLoading()
        }
    }

    onProgressLoading = () => {
        const { loadingUp, loading } = this.state

        if (loading && loadingUp != "" && loadingUp < Date.now()) {
            this.setState({
                loading: false,
                loadingUp: '',
                loadError: true,
            })
        } else if (!loading) {
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
        this.setState({ paused: !this.state.paused })
    }

    hideShowControls = () => {
        if (this.props.notHideControls) return

        const countdown = this.state.countdown
        const showControls = this.state.showControls

        if (!countdown && !this.state.paused) {

            this.setState({ countdown: true })

            setTimeout(() => {
                showControls && !this.state.paused ?
                    this.setState({ showControls: false })
                    :
                    false

                this.setState({countdown: false})
            }, 3000)
        }
    }

    render() {
        const {
            source,
            paused,
            showControls,
            loading,
            loadError,
            muted,
            currentTime,
            duration
        } = this.state

        const {
            orientation,
            width,
            height,
            ErrorScreenComponent,
            LoadingComponent,
            InitialPlayComponent,
            ControlBarComponent
        } = this.props

        const size = {
            width: width,
            height: orientation === 'portrait' ? (width * 0.5625) : height
        }

        const renderVideo = source ?
            <Video
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
            />
            : null

        const renderError =
            <ErrorScreenComponent
                reload={this.reload}
            />

        const renderLoading = loading &&
            <LoadingComponent />

        const renderCenterPlayButton = !loading && paused &&
            <InitialPlayComponent
                togglePause={this.togglePause}
            />

        const renderControlBar = showControls &&
            <ControlBar
                Component={ControlBarComponent}
                togglePause={this.togglePause}
                paused={paused}
                muted={muted}
                toggleMute={() => this.setState({ muted: !muted })}
                reload={this.reload}
                currentTime={currentTime}
                orientation={orientation}
                duration={duration}
            />

        const renderToggleControlsFrame = !loading && !paused &&
            <ButtonFrame
                style={boxStyle}
                onPress={() => this.setState({ showControls: !showControls })}
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
                style={[{ backgroundColor: '#000' }, size]}
            >
                {render}
            </View>
        )
    }
}