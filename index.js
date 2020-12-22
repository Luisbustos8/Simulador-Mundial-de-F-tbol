import groupPhase from "./classes/groupPhase.js"
import { worldCupTeams } from "./teams.js"





const config = { rounds:1, pointsPerWin:3, pointsPerDraw:1, pointsPerLose:0 }
const worldCup = new groupPhase("World Cup", worldCupTeams)
const teamNames = worldCup.teams.map(team => team.name)


console.log("=========================================")
console.log("========= COMIENZA EL MUNDIAL ===========")
console.log("=========================================")
console.log("EQUIPOS PARTICIPANTES:")
console.log(worldCupTeams)

worldCup.lotteryGroups()
worldCup.initSchedule()
worldCup.generateFullSchedule()



