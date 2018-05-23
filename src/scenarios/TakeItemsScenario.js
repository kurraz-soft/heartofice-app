import React from 'react';
import { connect } from 'react-redux';
import {takeItem, throwItem, toggleItemsUI} from "../actions/gameActions";
import InventoryUtil from "../utils/Inventory";

class TakeItemsScenario extends React.Component
{
    constructor()
    {
        super();

        this.toggle =this.toggle.bind(this);
    }

    toggle()
    {
        this.props.dispatch(toggleItemsUI());
    }

    take(index)
    {
        this.props.dispatch(takeItem(index));
    }

    throw(index)
    {
        this.props.dispatch(throwItem(index));
    }

    render()
    {
        return (
            <div className="col">
                <div className={this.props.is_opened ? 'd-none' : ''}>
                    <div dangerouslySetInnerHTML={{__html: this.props.body}} />
                    <p>
                        <button className="btn btn-primary" onClick={this.toggle}>Взять предметы</button>
                    </p>
                </div>
                <div className={this.props.is_opened ? '' : 'd-none'}>
                    Выберите желаемые предметы
                    <div className="card-columns">
                        <div className="card bg-dark">
                            <div className="card-body">
                                <h5 className="card-title">Предметы</h5>
                                <hr className="separator-h" />
                                <ul className="list-unstyled text-center">
                                    { this.props.items.map((item, index) => {
                                        return (
                                            <li key={index} className="bg-primary clearfix mt-2">
                                                <span className="p-2">{ item.name } ({item.count})</span>
                                                <button onClick={() => this.take(index)} className="btn btn-warning float-right"><span className="oi oi-arrow-right" /></button>
                                            </li>
                                        )
                                    }) }
                                </ul>
                            </div>
                        </div>
                        <div className="card bg-dark">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Инвентарь
                                    {`(${InventoryUtil.calcInventoryWeight(this.props.character.inventory)}/${this.props.character.inventory.maxWeight})`}
                                </h5>
                                <hr className="separator-h" />
                                <ul className="list-unstyled text-center">
                                    { this.props.character.inventory.items.map((item, index) => {
                                        return (
                                            <li key={index} className="bg-primary clearfix mt-2">
                                                <span className="p-2">{ item.name } ({item.count})</span>
                                                <button onClick={() => this.throw(index)} className="btn btn-warning float-left"><span className="oi oi-arrow-left" /></button>
                                            </li>
                                        )
                                    }) }
                                </ul>
                            </div>
                        </div>
                    </div>

                    <p>
                        <button className="btn btn-primary" onClick={this.toggle}>Закончить</button>
                    </p>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        body: state.body,
        items: state.params.takeItems.items,
        character: state.character,
        is_opened: state.item_ui_opened,
    };
})(TakeItemsScenario);