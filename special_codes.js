function celebrate() {
    var defaults = {
      spread: 360,
      ticks: 150,
      gravity: 0,
      decay: 0.94,
      startVelocity: 35,
      particleCount: 50,
    };
  
    function shoot() {
      confetti({
        ...defaults,
        scalar: 1.2,
        shapes: ["star"],
      });
  
      confetti({
        ...defaults,
        scalar: 0.75,
        shapes: ["circle"],
      });
    }
  
    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  }
export { celebrate };