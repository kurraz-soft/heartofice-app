import React from 'react';
import { connect } from 'react-redux';
import {buyItem, showNotify, takeItem, throwItem, toggleItemsUI} from "../actions/gameActions";
import InventoryUtil from "../utils/Inventory";

class ShopScenario extends React.Component
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

    buy(index)
    {
        if(parseInt(this.props.shop_items[index].price, 10) > parseInt(this.props.character.money, 10))
        {
            this.props.dispatch(showNotify('Не хватает средств'));
        }
        else
            this.props.dispatch(buyItem(index));
    }

    render()
    {
        return (
            <div className="col">
                <div className={this.props.is_opened ? 'd-none' : ''}>
                    <div dangerouslySetInnerHTML={{__html: this.props.body}} />
                    <p>
                        <button className="btn btn-primary" onClick={this.toggle}>Сделать покупки</button>
                    </p>
                </div>
                <div className={this.props.is_opened ? '' : 'd-none'}>
                    <div className="row">
                        <div className="col-md-4 col-sm-6 mt-2">
                            <div className="card bg-dark">
                                <div className="card-body">
                                    <h5 className="card-title">Продавец</h5>
                                    <hr className="separator-h" />
                                    <ul className="list-group list-group-flush text-center">
                                        { this.props.shop_items.map((item, index) => {
                                            return (
                                                <li key={index} className="bg-primary list-group-item">
                                                    <div className="row">
                                                        <div className="col-md-2 col-3">
                                                            <span className="icon-coin" />
                                                            <span className="">{item.price}</span>
                                                        </div>
                                                        <div className="col-md-9 col-7">{ item.name } ({item.count}) &nbsp;&nbsp;&nbsp;</div>
                                                        <button onClick={() => this.buy(index)} className="btn btn-warning col-md-1 col-2"><span className="oi oi-arrow-right" /></button>
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
                                                        <div className="col-md-10 col-10">{ item.name } ({item.count}) &nbsp;&nbsp;&nbsp;</div>
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
                                    <h5 className="card-title">Земля</h5>
                                    <hr className="separator-h" />
                                    <ul className="list-unstyled text-center">
                                        { this.props.items.map((item, index) => {
                                            return (
                                                <li key={index} className="bg-primary list-group-item">
                                                    <div className="row">
                                                        <button onClick={() => this.take(index)} className="btn btn-warning col-md-1 col-2"><span className="oi oi-arrow-left" /></button>
                                                        <div className="col-md-10 col-10">{ item.name } ({item.count}) &nbsp;&nbsp;&nbsp;</div>
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
        character: state.character,
        shop_items: state.params.shop.items,
        is_opened: state.item_ui_opened,
    };
})(ShopScenario);