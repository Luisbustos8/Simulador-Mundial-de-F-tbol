import groupPhase from "./classes/groupPhase.js"
import { worldCupTeams } from "./teams.js"


const config = { rounds:1, pointsPerWin:3, pointsPerDraw:1, pointsPerLose:0 }
const worldCup = new groupPhase("World Cup", worldCupTeams)
const teamNames = worldCup.teams.map(team => team.name)

console.log("=========================================")
console.log("========= COMIENZA EL MUNDIAL ===========")
console.log("=========================================")
console.log("EQUIPOS PARTICIPANTES:")
console.log("=========================================")
console.log(worldCupTeams)
console.log("=========================================")
worldCup.lotteryGroups()
console.log(worldCup.getGroups())
console.log("=========================================")
worldCup.generateFullSchedule()
console.log("CALENDARIO DEL MUNDIAL")
console.log("=========================================")

let i = 0
const letterGroup = ["A", "B", "C", "D", "E", "F", "G", "H"]
    worldCup.fullSchedule.forEach(groups => {
        console.log(`JORNADA ${1} GRUPO ${letterGroup[i]}`)
        groups[0].forEach(group => {
            const home = group[0] != null ? group[0] : 'DESCANSA'
            const away = group[1] != null ? group[1] : 'DESCANSA'
            console.log(`${home} vs ${away}`)
        }) 
        i++ 
    })

let y = 0
const letterGroup1 = ["A", "B", "C", "D", "E", "F", "G", "H"]
    worldCup.fullSchedule.forEach(groups => {
        console.log(`JORNADA ${2} GRUPO ${letterGroup1[y]}`)
        groups[1].forEach(group => {
            const home = group[0] != null ? group[0] : 'DESCANSA'
            const away = group[1] != null ? group[1] : 'DESCANSA'
            console.log(`${home} vs ${away}`)
        }) 
        y++  
    })

let z = 0
const letterGroup2 = ["A", "B", "C", "D", "E", "F", "G", "H"]
    worldCup.fullSchedule.forEach(groups => {
        console.log(`JORNADA ${3} GRUPO ${letterGroup2[z]}`)
        groups[2].forEach(group => {
            const home = group[0] != null ? group[0] : 'DESCANSA'
            const away = group[1] != null ? group[1] : 'DESCANSA'
            console.log(`${home} vs ${away}`)
        }) 
        z++  
    })
console.log("=========================================")
console.log("Comenzamos la fase de grupos")
console.log("=========================================") 
worldCup.start()
const lettersForGroup = ["A", "B", "C", "D", "E", "F", "G", "H"]
    worldCup.summaries.forEach((summary,index)=> {
    console.log(`RESUMEN GRUPO ${lettersForGroup[index]}`)
    summary.results.forEach(results => {
    console.log(`${results.homeTeam} ${results.homeGoals} - ${results.awayGoals} ${results.awayTeam}`)  
    })
    const filteredTeams = summary.standings.filter(team => team.group === lettersForGroup[index])
    console.table(filteredTeams.map((team, i) => {
        return {
            Position: i +1,
            Team:team.name,
            Points: team.points,
            PlayedMatches: team.matchesWon + team.matchesDrawn + team.matchesLost,
            Won: team.matchesWon,
            Drawn: team.matchesDrawn,
            Lost: team.matchesLost,
            GoalsFor: team.goalsFor,
            GoalsAgainst: team.goalsAgainst,
            GoalsDiff: team.goalsFor - team.goalsAgainst

        }
        
    })) 
})
worldCup.finalWorldCup()
console.log("=========================================") 
console.log("========= EMPIEZA LA FASE FINAL =========") 
console.log("=========================================") 
console.log(`RESUMEN OCTVAVOS DE FINAL`)
    worldCup.summariesOfRound16SideA.forEach(side => {
        side.results.forEach(match => {
            console.log(`${match.homeTeam} ${match.homeGoals} - ${match.awayGoals} ${match.awayTeam}`)
        }) 
    })
    worldCup.summariesOfRound16SideB.forEach(side => {
        side.results.forEach(match => {
            console.log(`${match.homeTeam} ${match.homeGoals} - ${match.awayGoals} ${match.awayTeam}`)
        }) 
    })

console.log("=========================================") 
console.log(`RESUMEN CUARTOS DE FINAL`)
    worldCup.summariesOfRound8SideA.forEach(side => {
        side.results.forEach(match => {
            console.log(`${match.homeTeam} ${match.homeGoals} - ${match.awayGoals} ${match.awayTeam}`)
        }) 
    })
    worldCup.summariesOfRound8SideB.forEach(side => {
        side.results.forEach(match => {
            console.log(`${match.homeTeam} ${match.homeGoals} - ${match.awayGoals} ${match.awayTeam}`)
        }) 
    })
console.log("=========================================") 
console.log(`RESUMEN SEMIFINALES`)
    worldCup.summariesOfSemifinalsSideA.forEach(side => {
        side.results.forEach(match => {
            console.log(`${match.homeTeam} ${match.homeGoals} - ${match.awayGoals} ${match.awayTeam}`)
        }) 
    })
    worldCup.summariesOfSemifinalsSideB.forEach(side => {
        side.results.forEach(match => {
            console.log(`${match.homeTeam} ${match.homeGoals} - ${match.awayGoals} ${match.awayTeam}`)
        }) 
    })
console.log("=========================================") 
console.log(`RESUMEN FINAL`)
    worldCup.summariesOfWorldCupfinal.forEach(side => {
        side.results.forEach(match => {
            console.log(`${match.homeTeam} ${match.homeGoals} - ${match.awayGoals} ${match.awayTeam}`)
        }) 
    })
console.log("=========================================") 
    worldCup.winnerWorldCup.forEach( winner =>{
        console.log(`${winner}`, "CAMPEÓN DEL MUNDO!!!!")
    })