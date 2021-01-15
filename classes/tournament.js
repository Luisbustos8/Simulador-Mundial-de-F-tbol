
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
export const LOCAL_TEAM = 0
export const AWAY_TEAM = 1
const GROUP_SIZE = 4

const GROUPS_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"]


export default class Tournament {  
    constructor(name, teams=[], config={}){
        this.name = name
        this.groups = []
        this.fullSchedule = []
        this.setup(config)
        this.setupTeams(teams)
        this.summaries = []
 
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
            matchesLost: 0,
            group: ""
        }
    }
    getTeamNames() {
        return this.teams.map(team => team.name)
    }
    getGroups(){
        return this.groups
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
    }

    generateFullSchedule(){
        
        
        
        for (let group of this.groups){
            const groupCalendarModified = this.generateCalendarForGroup(group)
            this.fullSchedule.push(groupCalendarModified)      
        }
        
        
       
        
    }
    generateCalendarForGroup(group){
    
        const groupSchedule = this.getGroupStructure()
        
        const groupScheduleWithLocals = this.setLocalTeam(group, groupSchedule)
        
        const groupScheduleWithAways = this.setAwayTeams(group, groupScheduleWithLocals)
   
        const groupScheduleWithAllMatches = this.fixLastTeamSchedule(group, groupScheduleWithAways)
       
        
        return groupScheduleWithAllMatches
        

        
    }
    
                
    
    getGroupStructure(){
        const numberOfMatchDays = GROUP_SIZE - 1
        const numberOfMatchesPerMatchDay = GROUP_SIZE / 2
        const groupStructure = []
        for (let i = 0; i < numberOfMatchDays; i++) {
            const matchDay = []  // jornada vacía
            for (let j = 0; j < numberOfMatchesPerMatchDay; j++) {
                const match = ['Equipo local', 'Equipo visitante']
                matchDay.push(match) 
            }
            groupStructure.push(matchDay) 
        } 
        return groupStructure
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
            if (matchDayNumber % 2 == 0) {
                firstMatch[AWAY_TEAM] = firstMatch[LOCAL_TEAM]
                firstMatch[LOCAL_TEAM] = lastTeamName
            } else { 
                firstMatch[AWAY_TEAM] = lastTeamName
            }
            matchDayNumber++
        })
        return groupSchedule 
    }  
    start(){
        
        this.fullSchedule.forEach((groups, index) => {
            const matchDaySummary = {
                results: [],
                standings: undefined,
                group: GROUPS_LETTERS[index]
            };
             
            for (const group of groups) {
                for (const match of group) {
                const result = this.play(match);
                this.updateTeams(result, GROUPS_LETTERS[index]);
                matchDaySummary.results.push(result);
                }
            }
            this.getStandings();
            matchDaySummary.standings = this.teams.map((team) =>
                Object.assign({}, team)
            );
            this.summaries.push(matchDaySummary);   
        });
    }
    getStandings() {
        throw new Error('getStandings not implemented')
    }

    updateTeams(result){
        throw new Error("update method not implemented")
    }
    play(group){
        throw new Error("play method not implemented")
    }
    
    startFinalPhase(){
        const sideA = ["A", "C", "E", "G"]
        const sideB = ["B", "D", "F", "H"]
        const groupA = []
        const groupB = []
        const standings = this.summaries[7].standings
        for (const letter of sideA){
            const teamsByGroup = standings.filter(team => team.group === letter);
            groupA.push(teamsByGroup[0].name)
            groupB.push(teamsByGroup[1].name)
        }
        for (const letter of sideB){
            const teamsByGroup = standings.filter(team => team.group === letter);
            groupB.push(teamsByGroup[0].name)
            groupA.push(teamsByGroup[1].name)
        }
        return groupA
        return groupB
        
    } 
    
     
    roundOf16(groupA, groupB){
        const roundOf16GroupA = this.startFinalPhase(groupA)
        const matchesOf16GroupA = {
            results: []
        }
        let aux = roundOf16GroupA.length / 2
        let matchesRoundOf16 = []
        for (let i= 0; i<roundOf16GroupA.length; i++){
            if ( i === 4){
                break
            }
            matchesRoundOf16.push(roundOf16GroupA[i])
            matchesRoundOf16.push(roundOf16GroupA[aux])           
            let result = this.playFinalPhase16A(matchesRoundOf16)                
            matchesOf16GroupA.results.push(result)           
            aux++
            matchesRoundOf16 = []  
        }
      
       
        
        const clasificatedForRound8 = []
        for (let i=0; i < matchesOf16GroupA.results.length; i++){
            if (matchesOf16GroupA.results[i].homeGoals > matchesOf16GroupA.results[i].awayGoals){
            clasificatedForRound8.push(matchesOf16GroupA.results[i].homeTeam)
        } else {
            clasificatedForRound8.push(matchesOf16GroupA.results[i].awayTeam)
        }
        }
        console.log(clasificatedForRound8)
        return clasificatedForRound8
    
        
        
    } 
    roundOf8(clasificatedForRound8){
        const roundOf8 = this.roundOf16(clasificatedForRound8)        
        const resultOf8 = {
            results: []
        }
        const matchesOf8 = []
        matchesOf8.push(roundOf8[0])
        matchesOf8.push(roundOf8[1])
        let result = this.playFinalPhase8A(matchesOf8)
        resultOf8.results.push(result)
        if (matchesOf8.length > 0){
            let matchesOf8 = []
            matchesOf8.push(roundOf8[2])
            matchesOf8.push(roundOf8[3])
            let result = this.playFinalPhase8A(matchesOf8)
            resultOf8.results.push(result)
        }
        const clasificatedForSemifinalsA = []
        for (let i=0; i < resultOf8.results.length; i++){
            if (resultOf8.results[i].homeGoals > resultOf8.results[i].awayGoals){
            clasificatedForSemifinalsA.push(resultOf8.results[i].homeTeam)
        } else {
            clasificatedForSemifinalsA.push(resultOf8.results[i].awayTeam)
        }
        }
        return clasificatedForSemifinalsA
    }
    semifinalsRound(clasificatedForSemifinalsA){
        const semifinalistTeams = this.roundOf8(clasificatedForSemifinalsA)
        console.log("Avanzan a semifinales--->", semifinalistTeams)
        const semifinal = {
            results: []
        }
        let result = this.playSemifinal(semifinalistTeams)
        semifinal.results.push(result)
        const firstFinalist = []
        for (let i=0; i < semifinal.results.length; i++){
            if (semifinal.results[i].homeGoals > semifinal.results[i].awayGoals){
            firstFinalist.push(semifinal.results[i].homeTeam)
        } else {
            firstFinalist.push(semifinal.results[i].awayTeam)
        }
        }
        console.log("El Primer finalista del Mundial es",  firstFinalist)
        
    }

    
    playFinalPhase16A(matchesRoundOf16){
        throw new Error("play method not implemented")
    }
    playFinalPhase8A(matchesOf8){
        throw new Error("play method not implemented")
    }
    playSemifinal(semifinalistTeams){
        throw new Error("play method not implemented")
    }
    playFinalPhaseB(groupB){
        throw new Error("play method not implemented")
    }
      

}
    
