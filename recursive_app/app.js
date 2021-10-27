class Face {
  constructor(featuringClass) {
    const faceFeatures = document.querySelectorAll(featuringClass);
    faceFeatures.forEach((faceFeature) => new Element(faceFeature));
  }
}

function allowDragging() {
  const myFace = new Face('.feature-img');
}
function rollback() {
  const faceFeatures = document.querySelectorAll('.feature-img');
  const initialFeaturesContainers = document.querySelectorAll('.initial');

  faceFeatures.forEach((item, index) => {
    
    item.remove();
    initialFeaturesContainers[index].appendChild(item)
  });
  //   initialFeaturesContainers.forEach((item) => console.log(item));
}

class Element {
  constructor(elementDom) {
    this.elementDom = elementDom;
    this.currentDroppable = null;
    this.departure = elementDom.parentNode;
    this.shiftX;
    this.shiftY;
    this.hidden;
    this.elementDom.onmousedown = (e) => {
      this.shiftX = e.clientX - this.elementDom.getBoundingClientRect().left;
      this.shiftY = e.clientY - this.elementDom.getBoundingClientRect().top;
      this.elementDom.classList.add('grabbing');
      this.elementDom.style.position = 'absolute';
      this.moveAt(e.pageX, e.pageY);
      document.addEventListener('mousemove', (e) => {
        this.onMouseMove(e);
      });
    };
    this.elementDom.onmouseup = () => {
      document.removeEventListener('mousemove', (e) => this.onMouseMove);
      this.elementDom.classList.remove('grabbing');
      if (this.currentDroppable) {
        this.leaveDroppable(this.currentDroppable);
        this.departure = this.currentDroppable;
        this.insert(this.currentDroppable, this.elementDom);
      } else {
        this.insert(this.departure, this.elementDom);
      }
    };
    this.elementDom.ondragstart = () => {
      return false;
    };
  }
  log() {
    console.log('log');
  }
  moveAt(pageX, pageY) {
    this.elementDom.style.left = pageX - this.shiftX + 'px';
    this.elementDom.style.top = pageY - this.shiftY + 'px';
  }
  onMouseMove(e) {
    this.moveAt(e.pageX, e.pageY);
    this.elementDom.hidden = true;
    let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
    this.elementDom.hidden = false;
    if (!elemBelow) return;
    let droppableBelow = elemBelow.closest('.featured-container');
    if (this.currentDroppable != droppableBelow) {
      if (this.currentDroppable) this.leaveDroppable(this.currentDroppable);
      this.currentDroppable = droppableBelow;
      if (this.currentDroppable) this.enterDroppable(this.currentDroppable);
    }
  }
  enterDroppable(elem) {
    elem.style.background = '#d7ffd7';
  }
  leaveDroppable(elem) {
    elem.style.background = '';
  }
  insert(parent, child) {
    this.elementDom.style.position = 'static';
    parent.appendChild(child);
  }
  toInitialState() {}
}

// const myFace = new Face('.feature-img');
