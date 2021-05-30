import { Component } from "@angular/core";
import { debug } from "util";

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
  public seconds: any = 0;
  public milliSeconds: any = 0;
  public counter = 0;
  public timer1;
  public timer2;
  public timer3;
  public solvesInfo: Array<object> = [];
  public solves: number = 1;
  public scramble;
  public previoudScrambles = [];
  public scrambleTracker = 0;
  public toggleClass = "solveTimer";
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
        if (shuffle[counter - 1][1] !== move[1]) {
          shuffle.push(move);
          counter++;
        }
      } else {
        shuffle.push(move);
        counter++;
      }
    }
    this.previoudScrambles.push(shuffle);
    debugger;
    this.scramble = shuffle.join("  ");
  }

  stopWatch() {
    if (this.counter === 0) {
      this.toggleClass = "inspectionTimer";
      this.seconds = 15;
      this.counter++;
      this.timer1 = setInterval(() => {
        this.seconds--;
        if (this.seconds === 0) {
          clearInterval(this.timer1);
          this.seconds = "DNF!";
          this.counter--;
        }
      }, 1000);
    } else if (this.counter === 1) {
      this.toggleClass = "solveTimer";
      this.counter++;
      clearInterval(this.timer1);
      this.seconds = 0;
      this.timer2 = setInterval(() => {
        this.seconds++;
      }, 1000);
    } else {
      debugger;
      this.solvesInfo.unshift({
        seconds: this.seconds,
        solveNumber: this.solves++,
      });
      clearInterval(this.timer2);
      clearInterval(this.timer3);
      this.counter = 0;
      this.seconds = 0;
      this.milliSeconds = 0;
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
}
