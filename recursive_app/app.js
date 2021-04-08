class Eyes {
    constructor() {
        const eyesList = document.querySelectorAll('.feature-img');
        for (let i = 0; i < eyesList.length; i++) {
            console.log(`eye ${i}: ${eyesList[i]}`);
        }
    }
}

const myEye = new Eyes();

let currentDroppable = null;
let eye = document.querySelector('.feature-img');

eye.onmousedown = function(event) {

    let shiftX = event.clientX - eye.getBoundingClientRect().left;
    let shiftY = event.clientY - eye.getBoundingClientRect().top;

    eye.style.position = 'absolute';
    eye.style.zIndex = 1000;
    document.body.append(eye);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      eye.style.left = pageX - shiftX + 'px';
      eye.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);

      eye.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      eye.hidden = false;

      if (!elemBelow) return;

      let droppableBelow = elemBelow.closest('.droppable');
      if (currentDroppable != droppableBelow) {
        if (currentDroppable) { // null если мы были не над droppable до этого события
          // (например, над пустым пространством)
          leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) { // null если мы не над droppable сейчас, во время этого события
          // (например, только что покинули droppable)
          enterDroppable(currentDroppable);
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    eye.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      if (currentDroppable) {
        leaveDroppable(currentDroppable);
        eye.onmouseup = null;
        eye.style.position = 'static';
        insert(currentDroppable, eye);
      }
      
    };

  };
eye.ondragstart = function() {
    return false;
};

function enterDroppable(elem) {
    elem.style.background = '#d7ffd7';
  }

function leaveDroppable(elem) {
    elem.style.background = '';
  }

function insert (parent, child) {
    parent.appendChild(child);
}
