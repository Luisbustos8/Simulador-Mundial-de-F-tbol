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
        this.matchDaySchedule = []
        this.fullSchedule = []
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
        this.groups = [
        this.groupA = teamsNames.splice(0, (teamsNames.length/8)),
        this.groupB = teamsNames.splice(0, (teamsNames.length/7)),
        this.groupC = teamsNames.splice(0, (teamsNames.length/6)),
        this.groupD = teamsNames.splice(0, (teamsNames.length/5)),
        this.groupE = teamsNames.splice(0, (teamsNames.length/4)),
        this.groupF = teamsNames.splice(0, (teamsNames.length/3)),
        this.groupG = teamsNames.splice(0, (teamsNames.length/2)),
        this.groupH = teamsNames.splice(0, (teamsNames.length))
    ]
        console.log("SORTEO GRUPOS WORLD CUP")
        console.log("Grupo A:", this.groupA)
        console.log("Grupo B:", this.groupB)
        console.log("Grupo C:", this.groupC)
        console.log("Grupo D:", this.groupD)
        console.log("Grupo E:", this.groupE)
        console.log("Grupo F:", this.groupF)
        console.log("Grupo G:", this.groupG)
        console.log("Grupo H:", this.groupH)
        
    }
    generateFullSchedule(){
        console.log("ww",this.groups)
        let prueba = []
        for (let group of this.groups){
            const groupCalendarModified = this.generateCalendarForGroup(group)
            console.log("kkk",groupCalendarModified)
            prueba.push(groupCalendarModified)
            console.log(prueba[0])
            
        }
        
       console.log("jaime", prueba[0])
       console.log("je", prueba[1])
       console.log("jae", prueba[2])
       console.log("je0", prueba[3])

        
    }
    generateCalendarForGroup(group){
        const groupSchedule = this.matchDaySchedule.slice()
       
        const groupScheduleWithLocals = this.setLocalTeam(group, groupSchedule)
        
        const groupScheduleWithAways = this.setAwayTeams(group, groupScheduleWithLocals)
   
        const groupScheduleWithAllMatches = this.fixLastTeamSchedule(group, groupScheduleWithAways)
        console.log("--->", groupScheduleWithAllMatches)
        return groupScheduleWithAllMatches
    }
    initSchedule(){
        const numberOfMatchDays = this.groupA.length - 1
        const numberOfMatchesPerMatchDay = this.groupA.length / 2
        for (let i = 0; i < numberOfMatchDays; i++) {
            const matchDay = []  // jornada vacía
            for (let j = 0; j < numberOfMatchesPerMatchDay; j++) {
                const match = ['Equipo local', 'Equipo visitante']
                matchDay.push(match) 
            }
            this.matchDaySchedule.push(matchDay)
            
        } 
                
    }
    setLocalTeam(group, groupSchedule){
        
        const teamsNames = group
        const maxHomeTeams = teamsNames.length - 2
        let teamIndex = 0
        groupSchedule.forEach(matchDay => {
            matchDay.forEach(match => {
                match[LOCAL_TEAM] = teamsNames[teamIndex]
                teamIndex++
                if (teamIndex > maxHomeTeams){
                    teamIndex = 0
                }
            })
             
        }) 
        return groupSchedule
    }
    setAwayTeams(group, groupSchedule) {
        const teamNames = group
        const maxAwayTeams = teamNames.length - 2
        let teamIndex = maxAwayTeams
        groupSchedule.forEach(matchDay => {
            let firstMatchFound = false
            matchDay.forEach(match => {
                if (!firstMatchFound) {
                    firstMatchFound = true
                } else {
                    match[AWAY_TEAM] = teamNames[teamIndex]
                    teamIndex--
                    if (teamIndex < 0) {
                        teamIndex = maxAwayTeams
                    }
                }
            })
        })
        return groupSchedule
    }
    fixLastTeamSchedule(group, groupSchedule) {
        let matchDayNumber = 1
        const teamNames = group
        const lastTeamName = teamNames[teamNames.length - 1]
        groupSchedule.forEach(matchDay => {
            const firstMatch = matchDay[0]
            if (matchDayNumber % 2 == 0) { // si jornada par -> juega en casa
                firstMatch[AWAY_TEAM] = firstMatch[LOCAL_TEAM]
                firstMatch[LOCAL_TEAM] = lastTeamName
            } else { // jornada impar -> juega fuera
                firstMatch[AWAY_TEAM] = lastTeamName
            }
            matchDayNumber++
        })
        return groupSchedule
        console.log("Sorteo grupo:", this.matchDaySchedule)
    }     
}
    

    
