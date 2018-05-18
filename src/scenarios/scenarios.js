import React from 'react'
import CharacterSelectScenario from "./CharacterSelectScenario";
import GameOverScenario from "./GameOverScenario";

export function resolveScenario(screnario) {
    switch (screnario)
    {
        case 'charSelect':
            return <CharacterSelectScenario/>;
        case 'GameOver':
            return <GameOverScenario/>;
        default:
            return <div />;
    }
}