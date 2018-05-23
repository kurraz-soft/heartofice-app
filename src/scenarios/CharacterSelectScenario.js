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
                        <p>{ item.skills.join(', ') }</p>
                        <strong>Досье:</strong>
                        <p>{ item.description }</p>
                        <p><strong>Здоровье:</strong> { item.health }</p>
                        <p><strong>Деньги:</strong> { item.money }</p>
                        <p><button data-value={index} onClick={this.chooseVariant} className="btn btn-primary">Выбрать</button></p>
                    </div>
                ))}
                <ul className='mt-3'>
                    <li>
                        <strong>Ловкость</strong>
                        <br />
                        Это умение выделывать акробатичские финты, быстро бегать,
                        преодолевать препятствия, держать равновесие и прыгать. Персонаж, обладающий этим умением, очень проворный и сообразительный.
                    </li>
                    <li>
                        <strong>Рукопашный бой</strong>
                        <br />
                        Возможность использовать боевые искусства,
                        включающие элементы каратэ, джиу-джитсу и тайджи.
                    </li>
                    <li>
                        <strong>Хитрость</strong>
                        <br />
                        Умение находить удачное решение в любой
                        сложной ситуации. Всегда пригодится.
                    </li>
                    <li>
                        <strong>Кибернетика</strong>
                        <br />
                        Практически забытая
                        в умирающем мире двадцать третьего столетия
                        наука программирования
                        и управления компьютерами.
                    </li>
                    <li>
                        <strong>ПСИ</strong>
                        <br />
                        Позволяет чувствовать
                        опасность и читать чужие
                        мысли. Вы должны иметь
                        при себе пси-фокусировщик для того, чтобы использовать это умение.
                    </li>
                    <li>
                        <strong>Знания</strong>
                        <br />
                        Совокупность легенд,
                        исторических и базовых
                        знаний, которые дают вам
                        хорошее представление
                        о том, с чем вы можете
                        столкнуться.
                    </li>
                    <li>
                        <strong>Управление парадоксом</strong>
                        <br />
                        Умение влиять на законы мироздания. Оно медленнее и не такое удобное, как ПСИ, но иногда
                        дает потрясающие результаты. Для использования
                        необходим пси-фокусировщик.
                    </li>
                    <li>
                        <strong>Стрельба</strong>
                        <br />
                        Умение использовать
                        дальнобойное оружие.
                        Конечно, для его использования необходимо оружие — бризальный пистолет.
                    </li>
                    <li>
                        <strong>Пилотирование</strong>
                        <br />
                        Позволяет управлять
                        практически любым средством передвижения: от
                        аэрокара до космического шаттла
                    </li>
                    <li>
                        <strong>Знание улиц</strong>
                        <br />
                        Обладая этим умением,
                        вы никогда не потеряетесь
                        ни в одном городе. Там,
                        где другие видят мешанину домов и лабиринт освещенных неоном улиц, вы
                        чувствуете себя как дома.
                    </li>
                    <li>
                        <strong>Воровство</strong>
                        <br />
                        Техники воровства
                        и шпионажа: карманничество, вскрытие замков,
                        а также возможность
                        скрыться в тени.
                    </li>
                    <li>
                        <strong>Выживание</strong>
                        <br />
                        Способность, которая
                        избавит вас от проблем
                        в пустынных и необитаемых регионах: лесах, пустынях, болотах и горах
                    </li>
                </ul>
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