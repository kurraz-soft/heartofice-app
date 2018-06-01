import React, { Component } from 'react';
import './App.css';
import Menu from "../components/Menu";
import AnswersContainer from "./AnswersContainer";
import { connect } from 'react-redux'
import {loadPage, pageActionFetch} from "../actions/gameActions";
import Viewport from "../components/Viewport";
import Notify from "../components/Notify";
import ItemTypes from "../utils/ItemTypes";

class App extends Component
{
    componentDidMount()
    {
        if(this.props.page === 'start' || this.props.page.toString().match(/^test_/))
            this.props.dispatch(loadPage(this.props.page, this.props.character));

        //this.props.dispatch(pageActionFetch(this.props.character, this.props.page, 0));
    }

    answerSelect(selected)
    {
        this.props.dispatch(pageActionFetch(this.props.character, this.props.page, selected));
    }

    render() {

        return (
          <div className='container-fluid' style={{height: 'inherit'}}>
              <Notify duration={700} />
              <div style={{height: 'inherit'}}>
                  <Menu style={{ marginBottom: '10px' }} is_loading={this.props.is_loading}>
                      <div style={{padding: '10px', textAlign: 'center'}}>
                          <h3 className="text-light">Персонаж</h3>
                          <p className="font-weight-light font-italic">{ this.props.character.class }</p>
                          <p className="font-weight-light font-italic"><small>Здоровье:</small> { this.props.character.health } / { this.props.character.healthMax }</p>
                          <div className="text-center">
                              <span className="icon-coin" />
                              <span>{this.props.character.money}</span>
                          </div>
                          <hr className="bg-light" />
                          <div style={{padding: '15px'}}>
                              <h5>Умения</h5>
                              <hr className="bg-light" />
                              <ul className='list-unstyled'>
                              {this.props.character.skills.map((skill, index) => (
                                  <li key={index}>{skill}</li>
                              ))}
                              </ul>
                          </div>
                          <div style={{padding: '15px'}}>
                              <h5>Инвентарь</h5>
                              <hr className="bg-light" />
                              <ul className='list-unstyled'>
                              {this.props.character.inventory.items.map((item, index) => {
                                  let name;
                                  if(item.type === ItemTypes.FIREARM)
                                  {
                                      name = `${item.name} (${item.count})`;
                                  }else
                                  {
                                      name = item.name;
                                  }
                                  return <li key={index}>{name}</li>
                              })}
                              </ul>
                          </div>
                          <div style={{padding: '15px'}}>
                              <h5>Заметки</h5>
                              <hr className="bg-light" />
                              <ul className='list-unstyled'>
                              {this.props.character.keywords.map((keyword, index) => (
                                  <li key={index}>{keyword}</li>
                              ))}
                              </ul>
                          </div>
                      </div>
                  </Menu>
                  <div className={'row game-viewport' + (this.props.answers.length > 0 ? '' : ' game-viewport-full')}>
                      <Viewport scenario={this.props.scenario} body={this.props.body} />
                  </div>
                  {this.props.answers.length > 0 ? <hr className='separator-h' /> : ''}
                  <div className='row'>
                      <div className='col'>
                          <AnswersContainer answers={this.props.answers} onSelect={this.answerSelect.bind(this)} />
                      </div>
                  </div>
              </div>
          </div>
      );
  }
}

export default connect((state) => {
    return {
        character: state.character,
        answers: state.answers,
        body: state.body,
        page: state.page,
        scenario: state.scenario,
    };
})(App);
