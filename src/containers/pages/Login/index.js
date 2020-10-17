import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/atoms/Button';
import {loginUserAPI} from '../../../config/redux/action'

class Login extends Component{ 

    state = {
        email: '',
        password: '',
    }

    handelChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleLoginSubmit = async () => {
        const { email, password } = this.state;
        // console.log(email, password);
        const {history} = this.props;
        const res = await this.props.loginAPI({email, password}).catch(err => err);
        if (res) {
            console.log("Login Sukses", res);
            localStorage.setItem('userData', JSON.stringify(res))
            this.setState({
                email: '',
                password: ''
            })
            history.push('/')
        }else{
            console.log("Login Gagal");
        }
    }

    render(){
        return(
            <div>
                <p>Login Page</p>
                <input placeholder="email" id="email" type="email" onChange={this.handelChangeText} value={this.state.email} />
                <input placeholder="password" id="password" type="password" onChange={this.handelChangeText} value={this.state.password} />
                <Button onClick={this.handleLoginSubmit} title="Login" loading={this.props.propsIsLoading}/>
                {/* <button>Go to Dashboard</button> */}
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
    loginAPI: (data) => dispatch(loginUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Login);