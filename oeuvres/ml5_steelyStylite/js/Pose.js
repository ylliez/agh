class Pose {

  constructor() {
    this.coordinates = [];
    this.points = [];
    this.frame = [];
    this.shoulders = {
      ly: undefined,
      ry: undefined,
      delta: undefined,
      deltaPrev: undefined,
      balance: undefined,
      disequilibrium: false
    }
  }

  update() {
    this.coordinate();
  }

  coordinate() {
    // console.log(this.coordinates);
    this.points = this.coordinates.pose.keypoints;
    this.frame = this.coordinates.skeleton;
    this.shoulders.ly = this.coordinates.pose.leftShoulder.y;
    this.shoulders.ry = this.coordinates.pose.rightShoulder.y;
  }

  drawPose() {
    this.drawKeypoints();
    this.drawSkeleton();
  }

  drawKeypoints()  {
    for (let i = 0; i < this.points.length; i++) {
      if (this.points[i].score > 0.2) {
        push();
        fill(255, 0, 0);
        noStroke();
        ellipse(this.points[i].position.x, this.points[i].position.y, 10, 10);
        pop();
      }
    }
  }

  drawSkeleton() {
    for (let i = 0; i < this.frame.length; i++) {
      let partA = this.frame[i][0];
      let partB = this.frame[i][1];
      push();
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
      pop();
    }
  }

  checkBalanceShoulders() {
    this.shoulders.delta = this.shoulders.ry - this.shoulders.ly;
    this.shoulders.balPrev = this.shoulders.balance;
    this.shoulders.balance = map(this.shoulders.delta, -100, 100, -PI/2, PI/2);
    this.shoulders.disequilibrium = abs(this.shoulders.delta) >= 30;
  }

}
