import React from 'react';
import { connect } from 'react-redux';
import {takeGroundItem, takeItem, throwItem, toggleItemsUI} from "../actions/gameActions";
import InventoryUtil from "../utils/Inventory";
import ItemTypes from "../utils/ItemTypes";

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
        //TODO limit function
        this.props.dispatch(takeItem(index));
    }

    groundTake(index)
    {
        this.props.dispatch(takeGroundItem(index));
    }

    throw(index)
    {
        this.props.dispatch(throwItem(index));
    }

    render()
    {
        const ItemName = (props) => (
            <span className="p-2">{ props.item.name }{props.item.type === ItemTypes.FIREARM ? ` (${props.item.count})` : '' }</span>
        );

        const takeLimit = this.props.takeLimit?<span>(Осталось: {this.props.takeLimit - this.props.taken})</span>:'';

        return (
            <div className="col">
                <div className={this.props.is_opened ? 'd-none' : ''}>
                    <div dangerouslySetInnerHTML={{__html: this.props.body}} />
                    <p>
                        <button className="btn btn-primary" onClick={this.toggle}>Взять предметы</button>
                    </p>
                </div>
                <div className={this.props.is_opened ? '' : 'd-none'}>
                    <div className="row">
                        <div className="col-md-4 col-sm-6 mt-2">
                            <div className="card bg-dark">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Предметы
                                        {takeLimit}
                                    </h5>
                                    <hr className="separator-h" />
                                    <ul className="list-group list-group-flush text-center">
                                        { this.props.items.map((item, index) => {
                                            return (
                                                <li key={index} className="bg-primary list-group-item">
                                                    <div className="row">
                                                        <div className="col-md-11 col-10"><ItemName item={item}/> &nbsp;&nbsp;&nbsp;</div>
                                                        <button onClick={() => this.take(index)} className="btn btn-warning col-md-1 col-2"><span className="oi oi-arrow-right" /></button>
                                                    </div>
                                                </li>
                                            )
                                        }) }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 mt-2">
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
                                                <li key={index} className="bg-primary list-group-item">
                                                    <div className="row">
                                                        <div className="col-md-11 col-10"><ItemName item={item}/> &nbsp;&nbsp;&nbsp;</div>
                                                        <button onClick={() => this.throw(index)} className="btn btn-warning col-md-1 col-2"><span className="oi oi-arrow-right" /></button>
                                                    </div>
                                                </li>
                                            )
                                        }) }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 mt-2">
                            <div className="card bg-dark">
                                <div className="card-body">
                                    <h5 className="card-title">Выбросить</h5>
                                    <hr className="separator-h" />
                                    <ul className="list-unstyled text-center">
                                        { this.props.groundItems.map((item, index) => {
                                            return (
                                                <li key={index} className="bg-primary list-group-item">
                                                    <div className="row">
                                                        <button onClick={() => this.groundTake(index)} className="btn btn-warning col-md-1 col-2"><span className="oi oi-arrow-left" /></button>
                                                        <div className="col-md-10 col-10"><ItemName item={item}/> &nbsp;&nbsp;&nbsp;</div>
                                                    </div>
                                                </li>
                                            )
                                        }) }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="mt-2">
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
        takeLimit: state.params.takeItems.takeLimit ? state.params.takeItems.takeLimit : 0,
        taken: state.params.takeItems.taken ? state.params.takeItems.taken : 0,
        groundItems: state.params.groundItems ? state.params.groundItems.items : [],
        character: state.character,
        is_opened: state.item_ui_opened,
    };
})(TakeItemsScenario);