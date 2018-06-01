import React from 'react'
import CharacterSelectScenario from "./CharacterSelectScenario";
import GameOverScenario from "./GameOverScenario";
import TakeItemsScenario from "./TakeItemsScenario";
import ShopScenario from "./ShopScenario"
import FinishScenario from "./FinishScenario"

export function resolveScenario(scenario) {
    switch (scenario)
    {
        case 'charSelect':
            return <CharacterSelectScenario/>;
        case 'GameOver':
            return <GameOverScenario/>;
        case 'takeItems':
            return <TakeItemsScenario/>;
        case 'shop':
            return <ShopScenario />;
        case 'finish':
            return <FinishScenario />;
        default:
            return <div />;
    }
}