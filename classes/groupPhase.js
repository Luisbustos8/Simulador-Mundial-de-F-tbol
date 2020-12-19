import Tournament from "./tournament.js"

export default class groupPhase extends Tournament {
    constructor(name, teams=[], config={}){
        super(name, teams, config)
        
    }
    setup(config) {
        const defaultConfig = {
            groups: 8,
            pointsPerWin: 3,
            pointsPerDraw: 1,
            pointsPerLose: 0
        }
        this.config = Object.assign(defaultConfig, config)
    }

}