import React, { Component } from 'react';
import './App.css';
import Menu from "../components/Menu";
import AnswersContainer from "./AnswersContainer";
import Game from "../core/Game";
import { connect } from 'react-redux'

class App extends Component
{
    constructor()
    {
        super();

        this.game = new Game();
    }

    componentDidMount()
    {
        this.game.run();
    }

    answerSelect(selected)
    {
        this.game.chooseAnswer(selected);
    }

    render() {
        return (
          <div className='container-fluid' style={{height: 'inherit'}}>
              <div style={{height: 'inherit'}}>
                  <Menu style={{ marginBottom: '10px' }}>
                      <div style={{padding: '10px', textAlign: 'center'}}>
                          <h3 className="text-light">Персонаж</h3>
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
                              {this.props.character.inventory.map((item, index) => (
                                  <li key={index}>{item}</li>
                              ))}
                              </ul>
                          </div>
                      </div>
                  </Menu>
                  <div className="row" style={{height: '60%'}}>
                      <div className="col">
                          {this.props.body}
                      </div>
                  </div>
                  <hr className='separator-h' />
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
    };
})(App);
