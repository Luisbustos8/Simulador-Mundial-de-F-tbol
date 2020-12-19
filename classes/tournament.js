Array.prototype.shuffle = function()
{
	var i = this.length;
	while (i)
	{
		var j = Math.floor(Math.random() * i);
		var t = this[--i];
		this[i] = this[j];
		this[j] = t;
	}
	return this;
}

const LOCAL_TEAM = 0
const AWAY_TEAM = 1




export default class Tournament {  
    constructor(name, teams=[], config={}){
        this.name = name
        this.groups = []
        this.setup(config)
        this.setupTeams(teams)

    }
    setup(config){
        const defaultConfig = { rounds:1 }
        this.config = config
    }
    setupTeams(teamsNames){
        this.teams = []
        for (const teamName of teamsNames) {
            const team = this.customizeTeam(teamName)
            this.teams.push(team)
        }
        this.teams.shuffle()
    }
    customizeTeam(teamName) {
        return {
            name: teamName,
            matchesWon: 0,
            matchesDrawn: 0,
            matchesLost: 0
        }
    }
    getTeamNames() {
        return this.teams.map(team => team.name)
    }
    lotteryGroups(){
        const teamsNames = this.getTeamNames()
        const groupA = teamsNames.splice(0, (teamsNames.length/8))
        const groupB = teamsNames.splice(0, (teamsNames.length/7))
        const groupC= teamsNames.splice(0, (teamsNames.length/6))
        const groupD = teamsNames.splice(0, (teamsNames.length/5))
        const groupE = teamsNames.splice(0, (teamsNames.length/4))
        const groupF = teamsNames.splice(0, (teamsNames.length/3))
        const groupG = teamsNames.splice(0, (teamsNames.length/2))
        const groupH = teamsNames.splice(0, (teamsNames.length))
        console.log("Grupo A:", groupA)
        console.log("Grupo B:", groupB)
        console.log("Grupo C:", groupC)
        console.log("Grupo D:", groupD)
        console.log("Grupo E:", groupE)
        console.log("Grupo F:", groupF)
        console.log("Grupo G:", groupG)
        console.log("Grupo H:", groupH)
    }

        
    }







   





