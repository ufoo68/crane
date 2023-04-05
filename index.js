const Leap = require("leapjs");
const five = require("johnny-five");

const motor = { right: 6, left: 5, down: 2, up: 3, forward: 8, back: 9 };

const board = new five.Board({ port: "COM5" });
board.on("ready", () => {
  const up = new five.Led(motor.up);
  const down = new five.Led(motor.down);
  const forward = new five.Led(motor.forward);
  const back = new five.Led(motor.back);
  const right = new five.Led(motor.right);
  const left = new five.Led(motor.left);

  const stop = () => {
    back.off();
    forward.off();
    down.off();
    up.off();
    right.off();
    left.off();
  };

  const controller = new Leap.Controller();
  controller.connect();
  controller.on("hand", (hand) => {
    console.log(hand.palmPosition);

    if (hand.palmPosition[2] > 40) {
      back.on();
    }
    if (hand.palmPosition[2] < -20) {
      forward.on();
    }
    if (hand.palmPosition[0] > 40) {
      right.on();
    }
    if (hand.palmPosition[0] < -40) {
      left.on();
    }
    if (hand.palmPosition[1] > 200) {
      up.on();
    }
    if (hand.palmPosition[1] < 60) {
      down.on();
    }
    setTimeout(stop, 500);
  });
});
