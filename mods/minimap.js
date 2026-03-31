class Minimap {
  static SCALE = 8;
  static DOT_RADIUS = 5;
  static DOT_COLOR = "red";

  constructor(soundManager) {
    this.trackPreviewDiv = document.createElement("div");
    this.trackPreviewDiv.className = "track-preview-container";

    this.minimapButton = document.createElement("button");
    this.minimapButton.className = "button";
    this.minimapButton.innerHTML = '<img class="button-icon" src="images/search.svg"> ';
    this.minimapButton.append(document.createTextNode("Minimap"));
    this.minimapButton.addEventListener("click", () => {
      soundManager.playUIClick();
      this.trackPreviewDiv.classList.toggle("hidden");
    });

    this.playerPos = { x: 0, y: 0, z: 0 };
    this.minX = 0;
    this.minZ = 0;
  }

  appendButton(container) {
    container.appendChild(this.minimapButton);
  }

  appendMinimap(container) {
    container.appendChild(this.trackPreviewDiv);
  }

  initTrackPreview(trackObject) {
    const trackData = trackObject.getTrackData();
    this.thumbCanvas = trackData.createThumbnail();
    this.minX = trackData.m_storedMinX;
    this.minZ = trackData.m_storedMinZ;

    this.displayCanvas = document.createElement("canvas");
    this.displayCanvas.width = this.thumbCanvas.width * Minimap.SCALE;
    this.displayCanvas.height = this.thumbCanvas.height * Minimap.SCALE;

    this.ctx = this.displayCanvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(this.thumbCanvas, 0, 0, this.displayCanvas.width, this.displayCanvas.height);

    this.trackPreviewDiv.innerHTML = "";
    this.trackPreviewDiv.appendChild(this.displayCanvas);
  }

  worldToDisplayCoords(worldX, worldZ) {
    return {
      x: (worldX / 20 - this.minX - 0.5) * Minimap.SCALE,
      y: (worldZ / 20 - this.minZ - 0.5) * Minimap.SCALE,
    };
  }

  updatePlayerPos(pos) {
    this.playerPos = pos;
    this.renderPlayer();
  }

  renderPlayer() {
    const { width, height } = this.displayCanvas;

    this.ctx.clearRect(0, 0, width, height);
    this.ctx.drawImage(this.thumbCanvas, 0, 0, width, height);

    const { x, y } = this.worldToDisplayCoords(this.playerPos.x, this.playerPos.z);

    if (x >= 0 && x < width && y >= 0 && y < height) {
      this.ctx.fillStyle = Minimap.DOT_COLOR;
      this.ctx.beginPath();
      this.ctx.arc(x, y, Minimap.DOT_RADIUS, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }
}