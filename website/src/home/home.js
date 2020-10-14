import React from 'react'

class Home extends React.Component {
    render() {
        return (
            <div>
                <video id='vid' width="100%" height="100%" autoPlay loop muted playsInline>
                    <source src='/video/firework.mp4' type="video/mp4"></source>
                </video>
            </div>
        )
    }
}
export default Home;