import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import toast from 'shared/utils/toast';
import {getStoredAuthToken, storeAuthToken} from 'shared/utils/authToken';
import {PageLoader} from 'shared/components';

//import api from 'shared/utils/api';

import '../styles/assets/css/main.css'
import '../styles/assets/css/util.css'
import {API} from "../constants/API";

import axios from 'axios'


import $ from 'jquery'

class Authenticate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            email: '',
            password: '',
            confirm: ''
        }
    }

    componentDidMount() {
        console.log('props is', this.props)

        //this.createGuestAccount()

        if (!getStoredAuthToken()) {
            //createGuestAccount();
        }
    }

    createGuestAccount = async () => {
        try {
            // const { authToken } = await api.post('/authentication/guest');
            // storeAuthToken(authToken);
            // this.props.history.push('/');
        } catch (error) {
            toast.error(error);
        }
    };

    login(e) {

        e.preventDefault()
        axios.post(API.login, this.state).then(({data}) => {
            console.log('result by ', data)
            if (data.authToken) {
                storeAuthToken(data.authToken);
                this.props.history.push('/');
            }
        }).catch( e => {
            alert('Неверные email или пароль')
            })
    }


    register() {
        axios.post(API.register, this.state).then(({data}) => {
            console.log('result by ', data)
            if (data.sub) {
                this.setState({isLogin: true})
            } else {
                alert('Неверные email или пароль')
            }

        })
    }


    render() {
        // <PageLoader/>
        return (

            <>
                <div className="limiter authPage">
                    <div className="container-login100">
                        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
                            {this.state.isLogin ?
                                <div className="login100-form validate-form">
                                    <span className="login100-form-title p-b-33">
                                        Войти
                                    </span>

                                    <div className="wrap-input100 validate-input"
                                         data-validate="Valid email is required: ex@abc.xyz">
                                        <input className="input100" type="text" name="email"
                                               placeholder="Введите e-mail почту"
                                               value={this.state.email}
                                               onChange={(e) => this.setState({email: $(e.target).val()})}
                                        />
                                        <span className="focus-input100-1"></span>
                                        <span className="focus-input100-2"></span>
                                    </div>

                                    <div className="wrap-input100 rs1 validate-input"
                                         data-validate="Password is required">
                                        <input className="input100" type="password" name="pass"
                                               placeholder="Введите пароль"
                                               value={this.state.password}
                                               onChange={(e) => this.setState({password: $(e.target).val()})}
                                        />
                                        <span className="focus-input100-1"></span>
                                        <span className="focus-input100-2"></span>
                                    </div>

                                    <div className="container-login100-form-btn m-t-20">
                                        <a className="login100-form-btn" onClick={(e) =>   this.login(e)}>
                                            Войти
                                        </a>
                                    </div>

                                    <div className="text-center p-t-45 p-b-4">
                                        <span className="txt1">
                                            Забыли
                                        </span>
                                        <a href="#" className="txt2 hov1 pl-2">
                                            логин / пароль?
                                        </a>
                                    </div>
                                    <div className="text-center">
                                        <span className="txt1">
                                            Создать новый аккаунт?
                                        </span>
                                        <a className="txt2 hov1 pl-2" onClick={() => this.setState({isLogin: false})}>
                                            Зарегистроваться
                                        </a>
                                    </div>
                                </div>
                                :
                                <div className="login100-form validate-form">
                                <span className="login100-form-title p-b-33">
                                    Регистрация
                                </span>

                                    <div className="wrap-input100 validate-input"
                                         data-validate="Valid email is required: ex@abc.xyz">
                                        <input className="input100" type="text" name="name" placeholder="Введите ФИО"
                                               value={this.state.name}
                                               onChange={(e) => this.setState({name: $(e.target).val()})}
                                        />
                                        <span className="focus-input100-1"></span>
                                        <span className="focus-input100-2"></span>
                                    </div>

                                    <div className="wrap-input100 validate-input"
                                         data-validate="Valid email is required: ex@abc.xyz">
                                        <input className="input100" type="email" name="email"
                                               value={this.state.email}
                                               onChange={(e) => this.setState({email: $(e.target).val()})}
                                               placeholder="Введите e-mail почту"/>
                                        <span className="focus-input100-1"></span>
                                        <span className="focus-input100-2"></span>
                                    </div>

                                    <div className="wrap-input100 rs1 validate-input"
                                         data-validate="Password is required">
                                        <input className="input100" type="password" name="password"
                                               placeholder="Введите пароль"
                                               value={this.state.password}
                                               onChange={(e) => this.setState({password: $(e.target).val()})}
                                        />
                                        <span className="focus-input100-1"></span>
                                        <span className="focus-input100-2"></span>
                                    </div>

                                    <div className="wrap-input100 rs1 validate-input"
                                         data-validate="Password is required">
                                        <input className="input100" type="password" name="confirm"
                                               value={this.state.confirm}
                                               onChange={(e) => this.setState({confirm: $(e.target).val()})}
                                               placeholder="Подтвердите пароль"/>
                                        <span className="focus-input100-1"></span>
                                        <span className="focus-input100-2"></span>
                                    </div>
                                    <div className="container-login100-form-btn m-t-20">
                                        <a className="login100-form-btn" onClick={() => this.register()}>
                                            Зарегистроваться
                                        </a>
                                    </div>
                                    <br/>
                                    <div className="text-center mt-1">
                                            <span className="txt1">
                                                Уже есть аккаунт?
                                            </span>
                                        <a className="txt2 hov1 pl-2" onClick={() => this.setState({isLogin: true})}>
                                            Войти</a>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
};

export default Authenticate;
