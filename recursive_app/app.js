class Face {
    constructor(featuringClass) {
        const elementList = document.querySelectorAll(featuringClass);
        for (let i = 0; i < elementList.length; i++) {
            this.eyesList = new Element(elementList[i]);
        }
    }
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
            document.addEventListener('mousemove', (e) => {this.onMouseMove(e)});
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
    
};

const myFace = new Face('.feature-img');

//********************************************************//


// let currentDroppable = null;
// let eye = document.getElementById('eye-2');
// let departure = eye.parentNode;
// let shiftX;
// let shiftY;
// let elemBelow;


// function moveAt(pageX, pageY) {
//     console.log(pageX, pageY);
//     eye.style.left = pageX - shiftX + 'px';
//     eye.style.top = pageY - shiftY + 'px';
// }

// function onMouseMove(e) {
//     moveAt(e.pageX, e.pageY);

//     eye.hidden = true;
//     elemBelow = document.elementFromPoint(e.clientX, e.clientY);
//     eye.hidden = false;

//     if (!elemBelow) return;

//     let droppableBelow = elemBelow.closest('.droppable');
//     if (currentDroppable != droppableBelow) {
//         if (currentDroppable) { // null если мы были не над droppable до этого события
//             // (например, над пустым пространством)
//             leaveDroppable(currentDroppable);
//         }
//         currentDroppable = droppableBelow;
//         if (currentDroppable) { // null если мы не над droppable сейчас, во время этого события
//             // (например, только что покинули droppable)
//             enterDroppable(currentDroppable);
//         }
//     }
// }

// eye.onmousedown = function (e) {
//     shiftX = e.clientX - eye.getBoundingClientRect().left;
//     shiftY = e.clientY - eye.getBoundingClientRect().top;

//     eye.classList.add('grabbing');
//     eye.style.position = 'absolute';

//     moveAt(e.pageX, e.pageY);

//     document.addEventListener('mousemove', onMouseMove);

// };
// eye.onmouseup = function () {
//     document.removeEventListener('mousemove', onMouseMove);
//     eye.classList.remove('grabbing');
//     if (currentDroppable) {
//         leaveDroppable(currentDroppable);
//         // eye.onmouseup = null;
//         insert(currentDroppable, eye);
//     } else {
//         insert(departure, eye);
//     }
// };
// eye.ondragstart = function () {
//     return false;
// };

// function enterDroppable(elem) {
//     elem.style.background = '#d7ffd7';
// }

// function leaveDroppable(elem) {
//     elem.style.background = '';
// }

// function insert(parent, child) {
//     eye.style.position = 'static';
//     parent.appendChild(child);
// }
