import React from 'react'

function formatTime(currentTime) {
    const formatter = function (num, size) { return ('000' + num).slice(size * -1); },
        time = parseFloat(currentTime).toFixed(3),
        hours = Math.floor(time / 60 / 60),
        minutes = Math.floor(time / 60) % 60,
        seconds = Math.floor(time - minutes * 60)

    const hoursFormatted = formatter(hours, 2) != '00' ? formatter(hours, 2) + ':' : ''
    return `${hoursFormatted}${formatter(minutes, 2)}:${formatter(seconds, 2)}`
}

function getCurrentTimePercentage(currentTime, duration) {
    if (currentTime > 0) {
        return parseFloat(currentTime) / parseFloat(duration)
    } else {
        return 0
    }
}

const ControlBar = ({ Component, currentTime, duration, ...props }) => {
    const currentTimeFormatted = formatTime(currentTime)
    const flexCompleted = getCurrentTimePercentage(currentTime, duration) * 100;
    const flexRemaining = (1 - getCurrentTimePercentage(currentTime, duration)) * 100;

    return (
        <Component
            currentTimeFormatted={currentTimeFormatted}
            currentTime={currentTime}
            flexCompleted={flexCompleted}
            flexRemaining={flexRemaining}
            {...props}
        />
    )
}

export default ControlBar