import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/atoms/Button';
import {registerUserAPI} from '../../../config/redux/action'

class Register extends Component {
    state = {
        email: '',
        password: '',
    }

    handelChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleRegisterSubmit = async () => {
        const { email, password } = this.state;
        // console.log(email, password);
        const res = await this.props.registerAPI({email, password}).catch(err => err)
        if (res) {
            this.setState({
                email: '',
                password: ''
            })
        }
    }

    render() {
        return (
            <div>
                <p>Register Page</p>
                <input placeholder="email" id="email" type="email" onChange={this.handelChangeText} value={this.state.email} />
                <input placeholder="password" id="password" type="password" onChange={this.handelChangeText} value={this.state.password} />
                <Button onClick={this.handleRegisterSubmit} title="Register" loading={this.props.propsIsLoading}/>
                <button>Go to Dashboard</button>
            </div>
        )
    }
}

const reduxState = (state) =>{
    return({
        propsIsLoading: state.isLoading
    })
}

const reduxDispatch = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUserAPI(data))
})


export default connect(reduxState, reduxDispatch)(Register);