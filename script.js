const video = document.getElementById("camera");
const toggleButton = document.getElementById("toggleCamera");

let currentFacingMode = "environment"; // start with back camera
let currentStream = null;

async function startCamera(facingMode) {
  // Stop previous stream
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode },
      audio: false
    });

    currentStream = stream;
    video.srcObject = stream;

    // Fix mirroring for front camera
    if (facingMode === "user") {
      video.classList.add("unmirrored");
    } else {
      video.classList.remove("unmirrored");
    }

  } catch (error) {
    alert("Camera access failed. Please allow permissions.");
  }
}

// Switch cameras
toggleButton.addEventListener("click", () => {
  currentFacingMode =
    currentFacingMode === "environment" ? "user" : "environment";
  startCamera(currentFacingMode);
});

// Start camera on load
startCamera(currentFacingMode);
