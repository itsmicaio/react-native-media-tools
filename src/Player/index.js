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
        loading: true,
        loadingUp: '',
        showControls: true,
        currentTime: 0,
        duration: 0,
        paused: this.props.isPaused,
        muted: false,
        countdown: false,
        isMounted: true
    }

    componentWillUnmount = () => {
        this.setState({ isMounted: false })
        this.setCurrentTime(this.state.currentTime)
    }
    

    onBuffer = (event) => {
        this.setState({ loading: event.isBuffering })

        if (this.props.onBuffer) this.props.onBuffer(event)
    }

    onLoad = (event) => {
        const { duration } = event
        this.setState({ loading: false, duration })

        if (this.props.onLoad) this.props.onLoad(event)
        this.refs.VIDEO_COMPONENT.seek(this.props.currentTime)
    }

    onError = (event) => {
        this.setState({
            loading: false,
            showControls: false,
            loadError: true,
        })

        if (this.props.onError) this.props.onError(event)
    }

    onLoadStart = (event) => {
        this.setState({ loading: true })

        if (this.props.onLoadStart) this.props.onLoadStart(event)
    }

    onReadyForDisplay = (event) => {
        this.setState({ loading: false })

        if (this.props.onReadyForDisplay) this.props.onReadyForDisplay(event)
    }

    onProgress = (event) => {
        const { currentTime } = event

        if (!this.state.isMounted) return

        if (currentTime != this.state.currentTime) {
            this.setState({
                currentTime,
                loading: false,
            })
        }
        else {
            this.onProgressLoading()
        }

        if (this.props.onProgress) this.props.onProgress(event)
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
        if (this.props.onProgressLoading) this.props.onProgressLoading(event)
    }

    promisedSetState = (newState) => {
        return new Promise((resolve) => {
            this.setState(newState, () => {
                resolve()
            });
        });
    }

    reload = async () => {
        const { setCurrentTime, setIsPaused } = this.props

        await this.promisedSetState({
            source: '',
            loadError: false,
            isMounted: false
        })

        await this.promisedSetState({
            source: this.props.source,
            isMounted: true
        })

        setCurrentTime(0)
        this.setState({ isMounted: true })
        this.refs.VIDEO_COMPONENT.seek(this.props.currentTime)
        setIsPaused(false)
    }

    togglePause = () => {
        const { isPaused, setIsPaused } = this.props
        this.setState({ paused: !this.state.paused })
        setIsPaused(!isPaused)
    }

    toggleFullScreen = () => {
        const { toggleFullScreen } = this.props
        const { currentTime } = this.state

        this.setState({ isMounted: false })
        toggleFullScreen(currentTime)
    }

    setCurrentTime = (time) => {
        this.setState({ isMounted: false })

        this.refs.VIDEO_COMPONENT.seek(time)
        this.props.setCurrentTime(time)

        this.setState({ isMounted: true })
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

                this.setState({ countdown: false })
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
            ControlBarComponent,
            ProgressBarComponent,
            onBuffer,
            onLoad,
            onError,
            onLoadStart,
            onReadyForDisplay,
            onProgress,
            toggleFullScreen,
            fullscreen,
            ...props
        } = this.props

        const size = {
            width: orientation === 'portrait' ? width : Dimensions.get('window').width,
            height: orientation === 'portrait' ? height : '96%',
        }

        const renderVideo = source ?
            <Video
                ref='VIDEO_COMPONENT'
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
                {...props}
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

        const renderProgressBarComponent = <ProgressBarComponent
            currentTime={currentTime}
            duration={duration}
            setCurrentTime={this.setCurrentTime}
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
                duration={duration}
                setCurrentTime={this.setCurrentTime}
                orientation={orientation}
                toggleFullScreen={this.toggleFullScreen}
                fullscreen={fullscreen}
                progressBarComponent={renderProgressBarComponent}
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
                {renderToggleControlsFrame}
                {renderLoading}
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