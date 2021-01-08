import Tournament from "./tournament.js"
//import { LOCAL_TEAM, AWAY_TEAM } from './tournament.js'//

export default class groupPhase extends Tournament {
    constructor(name, teams=[], config={}){
        super(name, teams, config)
        
    }
    setup(config) {
        const defaultConfig = {
            rounds: 1,
            pointsPerWin: 3,
            pointsPerDraw: 1,
            pointsPerLose: 0
        }
        this.config = Object.assign(defaultConfig, config)
    }
    generateGoals() {
        return Math.round(Math.random() * 10)
    }
    start(){

    }
}


