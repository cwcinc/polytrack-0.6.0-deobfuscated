class Minimap {
  // upscale factor compared to regular thumbnail scale
  static SCALE = 8;
  static MAIN_DOT_RADIUS = 5;
  static MULTIPLAYER_DOT_RADIUS = 3;
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

    this.playerMap = new Map();
    this.mainPlayerPos = {x: 0, y: 0, z: 0};
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

  setPlayerCar(id, carObject) {
    // random color seeded by id
    console.log(id);
    this.playerMap.set(id, {car: carObject, color: `hsl(${id * 137 % 360}, 50%, 50%)`});
  }

  updatePlayerPos(pos) {
    this.mainPlayerPos = pos;
    this.renderPlayer();
  }

  drawPlayerDot(x, z, color = Minimap.DOT_COLOR, radius = Minimap.MAIN_DOT_RADIUS) {
    const { width, height } = this.displayCanvas;
    const { x: x1, y: y1 } = this.worldToDisplayCoords(x, z);

    if (x1 >= 0 && x1 < width && y1 >= 0 && y1 < height) {
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }

  renderPlayer() {
    const { width, height } = this.displayCanvas;

    this.ctx.clearRect(0, 0, width, height);
    this.ctx.drawImage(this.thumbCanvas, 0, 0, width, height);

    this.drawPlayerDot(this.mainPlayerPos.x, this.mainPlayerPos.z, Minimap.DOT_COLOR, Minimap.MAIN_DOT_RADIUS);

    for (const [id, obj] of this.playerMap.entries()) {
      if (obj.car) {
        const carPos = obj.car.getPosition();

        this.drawPlayerDot(carPos.x, carPos.z, obj.color, Minimap.MULTIPLAYER_DOT_RADIUS);
      }
    }
  }
}