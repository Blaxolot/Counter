// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK5ooOuggg22vpFlPzLY1cyHjEAIKFseQ",
  authDomain: "fir-test-73f1d.firebaseapp.com",
  databaseURL: "https://fir-test-73f1d-default-rtdb.firebaseio.com",
  projectId: "fir-test-73f1d",
  storageBucket: "fir-test-73f1d.appspot.com",
  messagingSenderId: "460440151772",
  appId: "1:460440151772:web:734e44f71f56906e15f619",
  measurementId: "G-WGJLB375YB",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
firebase.analytics(app);

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
export { celebrate, database };
