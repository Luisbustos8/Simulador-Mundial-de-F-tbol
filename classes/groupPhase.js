import Tournament from "./tournament.js"
import { LOCAL_TEAM, AWAY_TEAM } from './tournament.js' 

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
    customizeTeam(teamName) {
        const customizedTeam = super.customizeTeam(teamName)
        return {
            points: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            ...customizedTeam
        }
    }

    generateGoals() {
        return Math.round(Math.random() * 5)
    }
    play(group){
        const homeGoals = this.generateGoals()
        const awayGoals = this.generateGoals()
        return {
            homeTeam: group[0],
            homeGoals: homeGoals,
            awayTeam: group[1],
            awayGoals: awayGoals
        }
    }
    getTeamsForNames(name) {
        return this.teams.find(team => team.name == name)
    }
    updateTeams(result, group){
        const homeTeam = this.getTeamsForNames(result.homeTeam)
        const awayTeam = this.getTeamsForNames(result.awayTeam)
        

        if (homeTeam && awayTeam) { 

            homeTeam.goalsFor += result.homeGoals
            homeTeam.goalsAgainst += result.awayGoals
            homeTeam.group = group
            awayTeam.goalsFor += result.awayGoals
            awayTeam.goalsAgainst += result.homeGoals
            awayTeam.group = group
            

            if (result.homeGoals > result.awayGoals) { 
                homeTeam.points += this.config.pointsPerWin
                homeTeam.matchesWon += 1
                awayTeam.points += this.config.pointsPerLose
                awayTeam.matchesLost += 1
            } else if (result.homeGoals < result.awayGoals) { 
                homeTeam.points += this.config.pointsPerLose
                homeTeam.matchesLost += 1
                awayTeam.points += this.config.pointsPerWin
                awayTeam.matchesWon += 1
            } else { // empate
                homeTeam.points += this.config.pointsPerDraw
                homeTeam.matchesDrawn += 1
                awayTeam.points += this.config.pointsPerDraw
                awayTeam.matchesDrawn += 1
            }
        }

    }
    getStandings() {
        this.teams.sort(function(teamA, teamB) {
            if (teamA.points > teamB.points) {
                return -1
            } else if (teamA.points < teamB.points) {
                return 1
            } else { 
               const goalsDiffA = teamA.goalsFor - teamA.goalsAgainst
               const goalsDiffB = teamB.goalsFor - teamB.goalsAgainst
               if (goalsDiffA > goalsDiffB) {
                   return -1
               } else if (goalsDiffA < goalsDiffB) {
                   return 1
               } else {
                   return 0
               }
            }
        })
    }
    playFinalPhase16A(matchesRoundOf16){
        const homeGoals = this.generateGoals()
        const awayGoals = this.generateGoals()
        while (homeGoals === awayGoals){
            const homeGoals = this.generateGoals()
            const awayGoals = this.generateGoals()
            return {
                homeTeam: matchesRoundOf16[0],
                homeGoals: homeGoals,
                awayTeam: matchesRoundOf16[1],
                awayGoals: awayGoals 
            }
        }
        return {
            homeTeam: matchesRoundOf16[0],
            homeGoals: homeGoals,
            awayTeam: matchesRoundOf16[1],
            awayGoals: awayGoals
        }
    }
    playFinalPhase8A(matchesOf8){
        const homeGoals = this.generateGoals()
        const awayGoals = this.generateGoals()
        while (homeGoals === awayGoals){
            const homeGoals = this.generateGoals()
            const awayGoals = this.generateGoals()
            return {
                homeTeam:matchesOf8[0],
                homeGoals: homeGoals,
                awayTeam: matchesOf8[1],
                awayGoals: awayGoals 
            }
        }
        return {
            homeTeam: matchesOf8[0],
            homeGoals: homeGoals,
            awayTeam: matchesOf8[1],
            awayGoals: awayGoals
        }
    }
    playSemifinal(semifinalistTeams){
        const homeGoals = this.generateGoals()
        const awayGoals = this.generateGoals()
        while (homeGoals === awayGoals){
            const homeGoals = this.generateGoals()
            const awayGoals = this.generateGoals()
            return {
                homeTeam:semifinalistTeams[0],
                homeGoals: homeGoals,
                awayTeam: semifinalistTeams[1],
                awayGoals: awayGoals 
            }
        }
        return {
            homeTeam: semifinalistTeams[0],
            homeGoals: homeGoals,
            awayTeam: semifinalistTeams[1],
            awayGoals: awayGoals
        }
    }

}