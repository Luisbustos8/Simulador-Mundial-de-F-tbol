

class Tournament {  
    constructor(name, teams=[], rounds=1){
        this.name = name
        this.teams = teams
        this.round = rounds
        this.groupMatchSchedule = []

    }
}
const worldCupTeams = ["España", "Alemania"]
const worldCup = new Tournament("World Cup", worldCupTeams)

for (const team of worldCup.teams){
    console.log(team)
}