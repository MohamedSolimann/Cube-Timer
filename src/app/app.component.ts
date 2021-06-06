import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor() {
    this.generateScramble();
    window.addEventListener("keyup", (e) => {
      if (e.code === "Space") {
        this.stopWatch();
      }
    });
  }

  title = "cubtTimer";
  public minutes = 0;
  public seconds: any = 0;
  public milliSeconds: any = 0;
  public counter = 0;
  public timer1;
  public timer2;
  public timer3;
  public solvesInfo: any = [];
  public solves: number = 0;
  public scramble;
  public previoudScrambles = [];
  public scrambleTracker = 0;
  public average;
  public toggleClass = "solveTimer";
  public showScramble: boolean = true;
  public showScores: boolean = true;
  public showButtons: boolean = true;
  public showMinutes: boolean = false;
  public showMilliSeconds: boolean = true;
  public moves: Array<string> = [
    "F",
    "B",
    "U",
    "D",
    "R",
    "L",
    "F'",
    "B'",
    "U'",
    "D'",
    "R'",
    "L'",
    "F2",
    "B2",
    "U2",
    "D2",
    "R2",
    "L2",
  ];

  generateScramble() {
    let counter = 0;
    let shuffle = [];
    while (counter < 20) {
      let move = this.moves[Math.floor(Math.random() * 18)];
      if (counter >= 1) {
        let currentMove = move[0];
        let previousMove = shuffle[counter - 1][0];
        if (currentMove !== previousMove) {
          shuffle.push(move);
          counter++;
        }
      } else {
        shuffle.push(move);
        counter++;
      }
    }
    this.previoudScrambles.push(shuffle);
    this.scramble = shuffle.join("  ");
  }

  stopWatch() {
    if (this.counter === 0) {
      this.showMilliSeconds = false;
      this.showMinutes = false;
      this.milliSeconds = 0;
      this.toggleClass = "inspectionTimer";

      this.seconds = 15;
      this.counter++;
      this.timer1 = setInterval(() => {
        this.seconds--;
        if (this.seconds === 0) {
          clearInterval(this.timer1);
          this.seconds = "DNF!";
          this.showScores = true;
          this.showScramble = true;
          this.showButtons = true;
          this.counter--;
        }
      }, 1000);
    } else if (this.counter === 1) {
      this.minutes = 0;
      this.showMilliSeconds = true;
      this.toggleClass = "solveTimer";
      this.counter++;
      clearInterval(this.timer1);
      this.seconds = 0;
      this.timer2 = setInterval(() => {
        this.milliSeconds++;
        if (this.milliSeconds === 10) {
          this.milliSeconds = 0;
          this.seconds++;
          if (this.seconds === 60) {
            this.showMinutes = true;
            this.minutes++;
            this.seconds = 0;
          }
        }
      }, 100);
    } else {
      this.solvesInfo.unshift({
        minutes: this.minutes,
        seconds: this.seconds,
        milliSeconds: this.milliSeconds,
        solveNumber: this.solves++,
      });
      if (this.solves >= 5) {
        let average = this.getAverage(5, this.solvesInfo);
        this.solvesInfo[0].ao5 = average;
        // lastSolve.ao5=
      }
      clearInterval(this.timer2);
      clearInterval(this.timer3);

      this.counter = 0;
      // this.seconds = 0;
      // this.milliSeconds = 0;
      this.generateScramble();
      this.scrambleTracker++;
    }
  }
  previousScramble() {
    this.scramble = this.previoudScrambles[this.scrambleTracker - 1];
    this.scrambleTracker--;
  }
  millisecondsTimer() {
    this.timer3 = setInterval(() => {
      this.milliSeconds = 0;
      this.milliSeconds++;
    }, 1);
  }
  nextScramble() {
    if (this.previoudScrambles[this.scrambleTracker + 1] === undefined) {
      this.generateScramble();
      this.scrambleTracker++;
    } else {
      this.scrambleTracker++;
      this.scramble = this.previoudScrambles[this.scrambleTracker];
    }
  }
  getAverage(n, arr) {
    debugger;
    let seconds = 0;
    let milliSeconds = 0;
    let minutes = 0;
    let average;
    for (let i = 0; i < 5; i++) {
      minutes += arr[i].minutes;
      seconds += arr[i].seconds;
      milliSeconds += arr[i].milliSeconds;
    }
    average = `${Math.floor(seconds / 5)}.${Math.floor(milliSeconds / 5)}`;
    return average;
  }
}
