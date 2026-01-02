const video = document.getElementById("camera");
const toggleButton = document.getElementById("toggleCamera");

let currentFacingMode = "environment";
let currentStream = null;

async function startCamera(facingMode) {
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

    // FIX MIRRORING
    if (facingMode === "user") {
      video.classList.add("unmirrored");
    } else {
      video.classList.remove("unmirrored");
    }

  } catch (error) {
    alert("Camera access failed. Please allow permissions.");
  }
}

toggleButton.addEventListener("click", () => {
  currentFacingMode =
    currentFacingMode === "environment" ? "user" : "environment";
  startCamera(currentFacingMode);
});

startCamera(currentFacingMode);
