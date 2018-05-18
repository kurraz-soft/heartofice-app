import React from 'react'
import { connect } from 'react-redux'
import {pageActionFetch} from "../actions/gameActions";

class CharacterSelectScenario extends React.Component
{
    constructor()
    {
        super();
        this.chooseVariant = this.chooseVariant.bind(this);
    }

    chooseVariant(event)
    {
        this.props.dispatch(pageActionFetch({}, this.props.page, event.target.dataset.value));
    }

    render()
    {
        return (
            <div className="row">
                {this.props.charClasses.map((item, index) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 border border-primary" key={index}>
                        <h3>{ item.class }</h3>
                        <strong>Умения:</strong>
                        <p>{ item.skills.join() }</p>
                        <strong>Досье:</strong>
                        <p>{ item.description }</p>
                        <p><strong>Здоровье:</strong> { item.health }</p>
                        <p><strong>Деньги:</strong> { item.money }</p>
                        <p><button data-value={index} onClick={this.chooseVariant} className="btn btn-primary">Выбрать</button></p>
                    </div>
                ))}
            </div>
        );
    }
}

export default connect((state) => {
    return {
        charClasses: state.params,
        page: state.page,
    }
})(CharacterSelectScenario);