
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
        this.summariesOfRound16SideA = []
        this.summariesOfRound16SideB = []
        this.summariesOfRound8SideA = []
        this.summariesOfRound8SideB = []
        this.summariesOfSemifinalsSideA = []
        this.summariesOfSemifinalsSideB = []
        this.summariesOfWorldCupfinal = []
        this.winnerWorldCup = []
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
    
    setTeamsForFinalPhase(){
        const sideA = ["A", "C", "E", "G"]
        const sideB = ["B", "D", "F", "H"]
        const groupA = []
        const standings = this.summaries[7].standings
        for (const letter of sideA){
            const teamsByGroup = standings.filter(team => team.group === letter);
            groupA.push(teamsByGroup[0].name)
        }
        for (const letter of sideB){
            const teamsByGroup = standings.filter(team => team.group === letter);
            groupA.push(teamsByGroup[1].name)
        
        }
        
        return groupA
    }
    setTeamsForFinalPhaseB(){
        const sideA = ["A", "C", "E", "G"]
        const sideB = ["B", "D", "F", "H"]
        const groupB = []
        const standings = this.summaries[7].standings
        for (const letter of sideA){
            const teamsByGroup = standings.filter(team => team.group === letter);
            groupB.push(teamsByGroup[1].name)
        }
        for (const letter of sideB){
            const teamsByGroup = standings.filter(team => team.group === letter);
            groupB.push(teamsByGroup[0].name)
        }
        
        
        return groupB
    } 
    
     
    roundOf16(){
        const roundOf16GroupA = this.setTeamsForFinalPhase()
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
        this.summariesOfRound16SideA.push(matchesOf16GroupA)
        
       
        
        const clasificatedForRound8 = []
        for (let i=0; i < matchesOf16GroupA.results.length; i++){
            if (matchesOf16GroupA.results[i].homeGoals > matchesOf16GroupA.results[i].awayGoals){
            clasificatedForRound8.push(matchesOf16GroupA.results[i].homeTeam)
        } else {
            clasificatedForRound8.push(matchesOf16GroupA.results[i].awayTeam)
        }
        }
        
        return clasificatedForRound8
    
        
        
    } 
    roundOf16B(){
        const roundOf16GroupB = this.setTeamsForFinalPhaseB()
        const matchesOf16GroupB = {
            results: []
        }
        let aux = roundOf16GroupB.length / 2
        let matchesRoundOf16B = []
        for (let i= 0; i<roundOf16GroupB.length; i++){
            if ( i === 4){
                break
            }
            matchesRoundOf16B.push(roundOf16GroupB[i])
            matchesRoundOf16B.push(roundOf16GroupB[aux])           
            let result = this.playFinalPhase16B(matchesRoundOf16B)                
            matchesOf16GroupB.results.push(result)           
            aux++
            matchesRoundOf16B = []  
        }
        this.summariesOfRound16SideB.push(matchesOf16GroupB)
        const clasificatedForRound8B = []
        for (let i=0; i < matchesOf16GroupB.results.length; i++){
            if (matchesOf16GroupB.results[i].homeGoals > matchesOf16GroupB.results[i].awayGoals){
            clasificatedForRound8B.push(matchesOf16GroupB.results[i].homeTeam)
        } else {
            clasificatedForRound8B.push(matchesOf16GroupB.results[i].awayTeam)
        }
        }
        
        return clasificatedForRound8B
        
    }
     roundOf8(){
        const roundOf8 = this.roundOf16() 
             
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
        this.summariesOfRound8SideA.push(resultOf8)
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
    roundOf8B(){
        const roundOf8B = this.roundOf16B()        
        const resultOf8B = {
            results: []
        }
        const matchesOf8B = []
        matchesOf8B.push(roundOf8B[0])
        matchesOf8B.push(roundOf8B[1])
        let result = this.playFinalPhase8B(matchesOf8B)
        resultOf8B.results.push(result)
        if (matchesOf8B.length > 0){
            let matchesOf8B = []
            matchesOf8B.push(roundOf8B[2])
            matchesOf8B.push(roundOf8B[3])
            let result = this.playFinalPhase8B(matchesOf8B)
            resultOf8B.results.push(result)
        }
        this.summariesOfRound8SideB.push(resultOf8B)
        const clasificatedForSemifinalsB = []
        for (let i=0; i < resultOf8B.results.length; i++){
            if (resultOf8B.results[i].homeGoals > resultOf8B.results[i].awayGoals){
            clasificatedForSemifinalsB.push(resultOf8B.results[i].homeTeam)
        } else {
            clasificatedForSemifinalsB.push(resultOf8B.results[i].awayTeam)
        }
        }
        
        return clasificatedForSemifinalsB
    }
    semifinalsRound(){
        const semifinalistTeams = this.roundOf8()
        const semifinal = {
            results: []
        }
        let result = this.playSemifinal(semifinalistTeams)
        semifinal.results.push(result)
        this.summariesOfSemifinalsSideA.push(semifinal)
        const firstFinalist = []
        for (let i=0; i < semifinal.results.length; i++){
            if (semifinal.results[i].homeGoals > semifinal.results[i].awayGoals){
            firstFinalist.push(semifinal.results[i].homeTeam)
        } else {
            firstFinalist.push(semifinal.results[i].awayTeam)
        }
        }
        
        return firstFinalist
    }
    semifinalsRoundB(){
        const semifinalistTeamsB = this.roundOf8B()
       
        const semifinalB = {
            results: []
        }
        let result = this.playSemifinal(semifinalistTeamsB)
        semifinalB.results.push(result)
        this.summariesOfSemifinalsSideB.push(semifinalB)
        const secondFinalist = []
        for (let i=0; i < semifinalB.results.length; i++){
            if (semifinalB.results[i].homeGoals > semifinalB.results[i].awayGoals){
            secondFinalist.push(semifinalB.results[i].homeTeam)
        } else {
            secondFinalist.push(semifinalB.results[i].awayTeam)
        }
        }
        
        return secondFinalist   
    }
    
    finalWorldCup(){
        const firstFinalist = this.semifinalsRound()
        const secondFinalist = this.semifinalsRoundB()
        const matchFinal =  {
            results: []
        }
        let result = this.playFinalWorldCup(firstFinalist, secondFinalist)
        matchFinal.results.push(result)
        
        this.summariesOfWorldCupfinal.push(matchFinal)
        const winner = []
        for (let i=0; i < matchFinal.results.length; i++){
            if (matchFinal.results[i].homeGoals > matchFinal.results[i].awayGoals){
            winner.push(matchFinal.results[i].homeTeam)
        } else {
            winner.push(matchFinal.results[i].awayTeam)
        }
        this.winnerWorldCup.push(winner)
    }
}
    
    
    playFinalPhase16A(matchesRoundOf16){
        throw new Error("play method not implemented")
    }
    playFinalPhase16B(matchesRoundOf16B){
        throw new Error("play method not implemented")
    }
    playFinalPhase8A(matchesOf8){
        throw new Error("play method not implemented")
    }
    playFinalPhase8B(matchesOf8B){
        throw new Error("play method not implemented")
    }
    playSemifinal(semifinalistTeams){
        throw new Error("play method not implemented")
    }
    playSemifinalB(semifinalistTeams){
        throw new Error("play method not implemented")
    }
    playFinalPhaseB(groupB){
        throw new Error("play method not implemented")
    }
    playFinalWorldCup(firstFinalist, secondFinalist){
        throw new Error("play method not implemented")
    }
      

}
    
