import React from 'react'
import HeaderComponent from '../header/header'
import DataContext from '../helper/datacontext';
import Helper from '../helper/helper';
import Routing from '../route/route';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            config: {}
        }
    }
    render() {
        return (
            <DataContext.Provider value={{ config: this.state.config }}>
                <div>
                    <HeaderComponent></HeaderComponent>
                    <Routing></Routing>
                </div>
            </DataContext.Provider>
        )
    }

    componentDidMount() {
        Helper.actionCall('config.json', this.success.bind(this), this.failure)
    }

    success(data) {
        console.log("success")
        this.setState({
            config: data
        })
    }

    failure(data) {
        console.log("actioncall failed")
    }
}

export default App;