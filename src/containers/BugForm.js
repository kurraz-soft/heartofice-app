import React from 'react'
import config from '../config'
import store from '../store'
import axios from 'axios'
import {showNotify} from "../actions/gameActions";

export default class BugForm extends React.Component
{
    constructor()
    {
        super();

        this.state = {
            text: "",
            is_loading: false,
        }
    }

    handleChangeText(e)
    {
        this.setState({text: e.target.value});
    }

    send()
    {
        this.setState({is_loading: true});

        const storeState = store.getState();

        axios.post(config.api.reportBug,{
            text: this.state.text,
            page: storeState.page,
        }).then((response) => {
            this.setState({is_loading: false, text: ""});

            if(response.data.status === 'OK')
            {
                store.dispatch(showNotify("Сообщение отправлено"));
            }else
            {
                store.dispatch(showNotify("Ошибка сервера. Попробуйте позже."));
            }
        })
    }

    render()
    {
        return (
            <div>
                <div className="form-group">
                    <textarea className="form-control bg-secondary text-light" onChange={this.handleChangeText.bind(this)} placeholder="Описание ошибки" value={this.state.text} />
                </div>
                <div>
                    <button disabled={this.state.is_loading} onClick={() => {this.send()}}>Отправить</button>
                </div>
            </div>
        );
    }
}