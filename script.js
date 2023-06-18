const adder = document.getElementById('adder');
const creator = document.getElementById('creator');
const todoText = document.getElementById('todotext');
let count = document.getElementById('count');
const mode = document.getElementById('mode');
const information = document.getElementsByClassName('information')[0];
const filter = document.getElementsByClassName('filter')[0];
const all = document.getElementsByClassName('all');
const actived = document.getElementsByClassName('actived');
const complite = document.getElementsByClassName('complite');
const clear = document.getElementById('clear');
const submit = document.getElementById('submit');

submit.addEventListener('click',(event) => {
    event.preventDefault()
})


creator.addEventListener('submit',(event) => {
    event.preventDefault();
    const addHtml = `
    <div class="task">
            <input class="check" type="checkbox">
            <div class="flex">
                <h3>${todoText.value}</h3>
                <img class="remove" src="assets/cross.svg" alt="cross">
            </div>
    </div>
    `;
    if(todoText.value !== "") {
        adder.innerHTML += addHtml;
        todoText.value = '';
        updateCount();
        toggled()
    }
    const remove = document.querySelectorAll('.remove');
    remove.forEach(i => {
        i.addEventListener('click',(event) => {
            const taskRemover = event.target.parentNode.parentNode;
            taskRemover.remove();
            updateCount();
        })
    });
    const check = document.querySelectorAll('.check');
    check.forEach(j => {
        j.addEventListener('click', (event) => {
            j.classList.remove('exit');
            const text = event.target.parentNode.childNodes[3].childNodes[1]
            text.style.textDecoration = j.checked ? 'line-through' : '';
            text.style.color = j.checked ? document.body.classList.contains('dark') ? '#494C6B' : '#D1D2DA' : document.body.classList.contains('dark') ? '#D1D2DA' : '#494C6B';
            const splt = j.className.split(' ');
            if (j.checked && splt[1] !== 'exit') {
                j.classList.add('exit');
            }
            updateCount();
        })
    })
});


function toggled() {
    const tasks = document.querySelectorAll('.task');
    const isDark = document.body.classList.contains('dark');
    tasks.forEach(task => {
        isDark ? task.classList.add('active') : task.classList.remove('active');
        isDark ? task.style.borderBottom = '.01rem solid #393A4B' : task.style.borderBottom = '.01rem solid #E3E4F1';
        if (isDark) task.childNodes[3].childNodes[1].style.color = '#C8CBE7';
    });
}

function updateCount() {
    const tasks = document.querySelectorAll('.task');
    let unchecked = 0;
    tasks.forEach(task => {
        const check = task.querySelector('.check');
        if(!check.checked && !check.classList.contains('exit')) unchecked++;
    });
    count.textContent = unchecked;
}
count.textContent = adder.childElementCount;

// interactive //////////////////////////////////
Array.from(all).forEach(el => {
    el.addEventListener('click',() => {
        adder.childNodes.forEach(ex => {
            if(ex.childNodes.length > 0 && ex.style.display === 'none') ex.style.display = "flex";
        });
    })
})

Array.from(actived).forEach( el => {
    el.addEventListener('click', () => {
        const exit = adder.querySelectorAll('.exit');
        exit.forEach(ex => {
            ex.parentNode.style.display = 'none';
        });
        adder.childNodes.forEach(ex => {
            if(ex.childNodes.length > 0 && ex.style.display === 'none') {
                ex.style.display = "flex";
            if(ex.childNodes[1].classList.contains('exit')) {
                ex.style.display = 'none';
            }
        }
        });
    })
})

Array.from(complite).forEach(el => {
    el.addEventListener('click', () => {
        const exit = adder.querySelectorAll('.exit');
        exit.forEach(ex => ex.parentNode.style.display = 'flex');
        adder.childNodes.forEach(ad => {
            if(ad.childNodes.length > 0 && !ad.childNodes[1].classList.contains('exit')) ad.style.display = 'none';
        })
    })
})

clear.addEventListener('click', () => {
    adder.childNodes.forEach(add => {
        if(add.childNodes.length > 0 && add.childNodes[1].classList.contains('exit')) add.remove()
    })
})
// interactive ends //////////////////////////////////


// dark mode --------------------------------
const list = [creator,todoText,information,filter];
const dark = localStorage.getItem('darkTheme');
function light() {
    mode.src = "assets/moon.svg";
    document.body.style.backgroundColor = 'white';
    document.body.style.backgroundImage = 'url(assets/desktop-light.jpg)';
    list.forEach(item => {item.classList.remove('active')});
    information.style.boxShadow = "";
    adder.style.boxShadow = "";
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    toggled()
    updateCount()
}

function black() {
    mode.src =  "assets/sun.svg";
    document.body.style.backgroundColor = '#171823';
    document.body.style.backgroundImage = 'url(assets/desktop-dark.jpg)';
    list.forEach(item => {item.classList.add('active')});
    information.style.boxShadow = "0px 35px 50px -15px rgba(0, 0, 0, 0.5)";
    adder.style.boxShadow = "0px 35px 50px -15px rgba(0, 0, 0, 0.5)"
    document.body.classList.remove('light');
    document.body.classList.add('dark');
    toggled();
}

mode.addEventListener('click', () => {
    if (mode.getAttribute('src') === 'assets/moon.svg') {
        black();
        localStorage.setItem('darkTheme',"isOn");
        return;
    }
    light();
    localStorage.removeItem('darkTheme');
});

dark === 'isOn' ? black() : light();
// dark mode ends    ------------------------------


